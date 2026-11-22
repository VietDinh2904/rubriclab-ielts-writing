const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
  "x-content-type-options": "nosniff",
  "referrer-policy": "same-origin",
};

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function textValue(value, field, { required = true, max = 20000 } = {}) {
  const normalized = typeof value === "string" ? value.trim() : "";
  if (required && !normalized) throw new HttpError(400, `${field} is required.`);
  if (normalized.length > max) throw new HttpError(400, `${field} is too long.`);
  return normalized;
}

async function readJson(request) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 200000) throw new HttpError(413, "Request body is too large.");
  try {
    return await request.json();
  } catch {
    throw new HttpError(400, "A valid JSON body is required.");
  }
}

function randomToken(bytes = 32) {
  const values = crypto.getRandomValues(new Uint8Array(bytes));
  return btoa(String.fromCharCode(...values)).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

async function hashToken(token) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function countWords(value) {
  return (value.match(/[A-Za-zÀ-ÿ0-9’'-]+/g) || []).length;
}

function normalizeCode(value) {
  return String(value || "").toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 24);
}

function generatedStudentCode() {
  return `RL-${randomToken(6).replace(/[^A-Z0-9]/gi, "").toUpperCase().slice(0, 8)}`;
}

function bearerToken(request) {
  const value = request.headers.get("authorization") || "";
  return value.toLowerCase().startsWith("bearer ") ? value.slice(7).trim() : "";
}

function requireDatabase(env) {
  if (!env.DB) throw new HttpError(503, "The D1 database binding is not configured yet.");
  return env.DB;
}

function teacherIdentity(request, env) {
  if (env.DEV_TEACHER_MODE === "true") return "local-teacher@rubriclab.dev";
  const email = (request.headers.get("cf-access-authenticated-user-email") || "").trim().toLowerCase();
  const assertion = request.headers.get("cf-access-jwt-assertion") || "";
  if (!email || !assertion) throw new HttpError(401, "Teacher access requires Cloudflare Access sign-in.");
  const allowlist = String(env.TEACHER_EMAILS || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  if (allowlist.length && !allowlist.includes(email)) throw new HttpError(403, "This teacher account is not allowed.");
  return email;
}

async function validateTurnstile(request, env, token) {
  if (!env.TURNSTILE_SECRET) return;
  if (!token) throw new HttpError(400, "Please complete the anti-spam check.");
  const form = new FormData();
  form.set("secret", env.TURNSTILE_SECRET);
  form.set("response", token);
  const ip = request.headers.get("cf-connecting-ip");
  if (ip) form.set("remoteip", ip);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
  const result = await response.json();
  if (!result.success) throw new HttpError(400, "The anti-spam check was not accepted.");
}

async function findOrCreateStudent(db, body) {
  const suppliedCode = normalizeCode(body.studentCode);
  const suppliedToken = textValue(body.studentToken, "Student token", { required: false, max: 200 });

  if (suppliedCode) {
    const existing = await db.prepare(
      "SELECT id, display_name, email, student_code, access_token_hash FROM students WHERE student_code = ?1"
    ).bind(suppliedCode).first();
    if (!existing) throw new HttpError(404, "This student code does not exist.");
    if (!suppliedToken || (await hashToken(suppliedToken)) !== existing.access_token_hash) {
      throw new HttpError(401, "This browser does not have the private token for that student code.");
    }
    const displayName = textValue(body.studentName, "Student name", { max: 100 });
    const email = textValue(body.studentEmail, "Student email", { required: false, max: 254 }).toLowerCase() || null;
    await db.prepare(
      "UPDATE students SET display_name = ?1, email = ?2, updated_at = CURRENT_TIMESTAMP WHERE id = ?3"
    ).bind(displayName, email, existing.id).run();
    return { id: existing.id, studentCode: existing.student_code, studentToken: null, created: false };
  }

  const displayName = textValue(body.studentName, "Student name", { max: 100 });
  const email = textValue(body.studentEmail, "Student email", { required: false, max: 254 }).toLowerCase() || null;
  const id = crypto.randomUUID();
  const studentToken = randomToken();
  const tokenHash = await hashToken(studentToken);

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const studentCode = generatedStudentCode();
    try {
      await db.prepare(
        "INSERT INTO students (id, display_name, email, student_code, access_token_hash) VALUES (?1, ?2, ?3, ?4, ?5)"
      ).bind(id, displayName, email, studentCode, tokenHash).run();
      return { id, studentCode, studentToken, created: true };
    } catch (error) {
      if (attempt === 4) throw error;
    }
  }
  throw new HttpError(500, "Could not create a student profile.");
}

async function createSubmission(request, env) {
  const db = requireDatabase(env);
  const body = await readJson(request);
  await validateTurnstile(request, env, body.turnstileToken);
  const student = await findOrCreateStudent(db, body);
  const taskType = ["task1", "task2", "free"].includes(body.taskType) ? body.taskType : "free";
  const promptId = textValue(body.promptId, "Prompt ID", { required: false, max: 100 }) || null;
  const promptTitle = textValue(body.promptTitle, "Prompt title", { max: 300 });
  const promptText = textValue(body.promptText, "Prompt", { max: 10000 });
  const essay = textValue(body.essay, "Essay", { max: 60000 });
  if (countWords(essay) < 20) throw new HttpError(400, "Write at least 20 words before submitting.");
  const targetBand = Number(body.targetBand);
  const safeBand = Number.isFinite(targetBand) && targetBand >= 4 && targetBand <= 9 ? targetBand : null;
  const id = crypto.randomUUID();
  const accessToken = randomToken();
  const accessTokenHash = await hashToken(accessToken);

  await db.prepare(
    `INSERT INTO submissions
      (id, student_id, access_token_hash, task_type, prompt_id, prompt_title, prompt_text, essay, target_band, word_count)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)`
  ).bind(id, student.id, accessTokenHash, taskType, promptId, promptTitle, promptText, essay, safeBand, countWords(essay)).run();

  return json({
    submissionId: id,
    accessToken,
    studentCode: student.studentCode,
    studentToken: student.studentToken,
    status: "submitted",
    message: "Your essay is in the teacher review queue.",
  }, 201);
}

async function publicSubmission(request, env, id) {
  const db = requireDatabase(env);
  const token = bearerToken(request);
  if (!token) throw new HttpError(401, "The private submission token is required.");
  const tokenHash = await hashToken(token);
  const row = await db.prepare(
    `SELECT s.id, s.task_type, s.prompt_id, s.prompt_title, s.prompt_text, s.essay, s.target_band,
            s.word_count, s.status, s.submitted_at, s.returned_at, st.display_name, st.student_code,
            r.task_response, r.coherence_cohesion, r.lexical_resource, r.grammar_accuracy,
            r.overall_band, r.glow, r.grow, r.next_step, r.updated_at AS reviewed_at
       FROM submissions s
       JOIN students st ON st.id = s.student_id
       LEFT JOIN reviews r ON r.submission_id = s.id
      WHERE s.id = ?1 AND s.access_token_hash = ?2`
  ).bind(id, tokenHash).first();
  if (!row) throw new HttpError(404, "Submission not found.");

  let annotations = [];
  if (row.status === "returned") {
    const result = await db.prepare(
      "SELECT id, start_offset, end_offset, kind, comment FROM annotations WHERE submission_id = ?1 ORDER BY start_offset"
    ).bind(id).all();
    annotations = result.results || [];
  }

  const review = row.status === "returned" ? {
    taskResponse: row.task_response,
    coherenceCohesion: row.coherence_cohesion,
    lexicalResource: row.lexical_resource,
    grammarAccuracy: row.grammar_accuracy,
    overallBand: row.overall_band,
    glow: row.glow,
    grow: row.grow,
    nextStep: row.next_step,
    reviewedAt: row.reviewed_at,
    annotations,
  } : null;

  return json({
    submission: {
      id: row.id,
      taskType: row.task_type,
      promptId: row.prompt_id,
      promptTitle: row.prompt_title,
      promptText: row.prompt_text,
      essay: row.essay,
      targetBand: row.target_band,
      wordCount: row.word_count,
      status: row.status,
      submittedAt: row.submitted_at,
      returnedAt: row.returned_at,
      studentName: row.display_name,
      studentCode: row.student_code,
    },
    review,
  });
}

async function listTeacherSubmissions(request, env) {
  const db = requireDatabase(env);
  teacherIdentity(request, env);
  const requested = new URL(request.url).searchParams.get("status") || "all";
  const allowed = new Set(["all", "submitted", "in_review", "reviewed", "returned"]);
  const status = allowed.has(requested) ? requested : "all";
  const statement = status === "all"
    ? db.prepare(
      `SELECT s.id, s.task_type, s.prompt_title, s.word_count, s.status, s.submitted_at,
              st.display_name, st.student_code
         FROM submissions s JOIN students st ON st.id = s.student_id
        ORDER BY CASE s.status WHEN 'submitted' THEN 0 WHEN 'in_review' THEN 1 WHEN 'reviewed' THEN 2 ELSE 3 END,
                 s.submitted_at DESC LIMIT 200`
    )
    : db.prepare(
      `SELECT s.id, s.task_type, s.prompt_title, s.word_count, s.status, s.submitted_at,
              st.display_name, st.student_code
         FROM submissions s JOIN students st ON st.id = s.student_id
        WHERE s.status = ?1 ORDER BY s.submitted_at DESC LIMIT 200`
    ).bind(status);
  const result = await statement.all();
  return json({ submissions: result.results || [] });
}

async function teacherSubmission(request, env, id) {
  const db = requireDatabase(env);
  teacherIdentity(request, env);
  const row = await db.prepare(
    `SELECT s.*, st.display_name, st.email AS student_email, st.student_code,
            r.teacher_email, r.task_response, r.coherence_cohesion, r.lexical_resource,
            r.grammar_accuracy, r.overall_band, r.glow, r.grow, r.next_step, r.private_note,
            r.updated_at AS reviewed_at
       FROM submissions s
       JOIN students st ON st.id = s.student_id
       LEFT JOIN reviews r ON r.submission_id = s.id
      WHERE s.id = ?1`
  ).bind(id).first();
  if (!row) throw new HttpError(404, "Submission not found.");
  const result = await db.prepare(
    "SELECT id, start_offset, end_offset, kind, comment FROM annotations WHERE submission_id = ?1 ORDER BY start_offset"
  ).bind(id).all();
  return json({ submission: row, annotations: result.results || [] });
}

function score(value, field) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0 || number > 9 || Math.round(number * 2) !== number * 2) {
    throw new HttpError(400, `${field} must be a half-band score between 0 and 9.`);
  }
  return number;
}

async function saveReview(request, env, id) {
  const db = requireDatabase(env);
  const teacherEmail = teacherIdentity(request, env);
  const body = await readJson(request);
  const submission = await db.prepare("SELECT essay FROM submissions WHERE id = ?1").bind(id).first();
  if (!submission) throw new HttpError(404, "Submission not found.");
  const tr = score(body.taskResponse, "Task Response/Achievement");
  const cc = score(body.coherenceCohesion, "Coherence & Cohesion");
  const lr = score(body.lexicalResource, "Lexical Resource");
  const gra = score(body.grammarAccuracy, "Grammar Range & Accuracy");
  const overall = Math.round(((tr + cc + lr + gra) / 4) * 2) / 2;
  const glow = textValue(body.glow, "Glow", { required: false, max: 4000 });
  const grow = textValue(body.grow, "Grow", { required: false, max: 4000 });
  const nextStep = textValue(body.nextStep, "Next step", { required: false, max: 4000 });
  const privateNote = textValue(body.privateNote, "Private note", { required: false, max: 4000 });
  const annotations = Array.isArray(body.annotations) ? body.annotations : [];
  if (annotations.length > 100) throw new HttpError(400, "A review can contain at most 100 inline comments.");

  const normalizedAnnotations = annotations.map((item) => {
    const start = Number(item.startOffset);
    const end = Number(item.endOffset);
    const kind = item.kind === "strong" ? "strong" : "revision";
    const comment = textValue(item.comment, "Annotation comment", { max: 1000 });
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end <= start || end > submission.essay.length) {
      throw new HttpError(400, "An inline comment has an invalid text range.");
    }
    return { id: crypto.randomUUID(), start, end, kind, comment };
  }).sort((a, b) => a.start - b.start);

  const statements = [
    db.prepare(
      `INSERT INTO reviews
        (submission_id, teacher_email, task_response, coherence_cohesion, lexical_resource,
         grammar_accuracy, overall_band, glow, grow, next_step, private_note)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)
       ON CONFLICT(submission_id) DO UPDATE SET
         teacher_email = excluded.teacher_email,
         task_response = excluded.task_response,
         coherence_cohesion = excluded.coherence_cohesion,
         lexical_resource = excluded.lexical_resource,
         grammar_accuracy = excluded.grammar_accuracy,
         overall_band = excluded.overall_band,
         glow = excluded.glow,
         grow = excluded.grow,
         next_step = excluded.next_step,
         private_note = excluded.private_note,
         updated_at = CURRENT_TIMESTAMP`
    ).bind(id, teacherEmail, tr, cc, lr, gra, overall, glow, grow, nextStep, privateNote),
    db.prepare("DELETE FROM annotations WHERE submission_id = ?1").bind(id),
    ...normalizedAnnotations.map((item) => db.prepare(
      `INSERT INTO annotations (id, submission_id, start_offset, end_offset, kind, comment)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
    ).bind(item.id, id, item.start, item.end, item.kind, item.comment)),
    db.prepare(
      "UPDATE submissions SET status = 'reviewed', updated_at = CURRENT_TIMESTAMP WHERE id = ?1 AND status != 'returned'"
    ).bind(id),
  ];
  await db.batch(statements);
  return json({ saved: true, overallBand: overall, annotationCount: normalizedAnnotations.length });
}

async function returnReview(request, env, id) {
  const db = requireDatabase(env);
  teacherIdentity(request, env);
  const review = await db.prepare("SELECT submission_id FROM reviews WHERE submission_id = ?1").bind(id).first();
  if (!review) throw new HttpError(409, "Save the rubric review before returning it.");
  await db.prepare(
    "UPDATE submissions SET status = 'returned', returned_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?1"
  ).bind(id).run();
  return json({ returned: true });
}

async function routeApi(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";
  if (path === "/api/health" && request.method === "GET") return json({ ok: true, database: Boolean(env.DB) });
  if (path === "/api/submissions" && request.method === "POST") return createSubmission(request, env);

  let match = path.match(/^\/api\/submissions\/([0-9a-f-]{36})$/i);
  if (match && request.method === "GET") return publicSubmission(request, env, match[1]);

  if (path === "/api/teacher/submissions" && request.method === "GET") return listTeacherSubmissions(request, env);
  match = path.match(/^\/api\/teacher\/submissions\/([0-9a-f-]{36})$/i);
  if (match && request.method === "GET") return teacherSubmission(request, env, match[1]);
  match = path.match(/^\/api\/teacher\/submissions\/([0-9a-f-]{36})\/review$/i);
  if (match && request.method === "PUT") return saveReview(request, env, match[1]);
  match = path.match(/^\/api\/teacher\/submissions\/([0-9a-f-]{36})\/return$/i);
  if (match && request.method === "POST") return returnReview(request, env, match[1]);
  throw new HttpError(404, "API route not found.");
}

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      if (url.pathname.startsWith("/api/")) return await routeApi(request, env);
      return env.ASSETS.fetch(request);
    } catch (error) {
      if (error instanceof HttpError) return json({ error: error.message }, error.status);
      console.error(error);
      return json({ error: "Unexpected server error." }, 500);
    }
  },
};
