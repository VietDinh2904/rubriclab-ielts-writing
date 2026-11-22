const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

let queue = [];
let activeId = "";
let detail = null;
let annotations = [];
let selectedRange = null;
let activeAnnotationId = "";

const escapeHtml = (value) => String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
const statusLabel = (status) => ({ submitted: "Waiting", in_review: "In review", reviewed: "Saved", returned: "Returned" }[status] || status);

function toast(message) {
  const node = $("#toast");
  node.textContent = message;
  node.classList.add("show");
  setTimeout(() => node.classList.remove("show"), 2300);
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: { "content-type": "application/json", ...(options.headers || {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status}).`);
  return data;
}

function queueError(error) {
  $("#queue-status").textContent = "Teacher access is not ready.";
  $("#submission-list").innerHTML = `<div class="error-card"><strong>Cannot open the review queue.</strong><br>${escapeHtml(error.message)}<br><br>Protect this page and <code>/api/teacher/*</code> with Cloudflare Access, then sign in by email.</div>`;
}

async function loadQueue() {
  $("#queue-status").textContent = "Loading submissions…";
  try {
    const status = $("#queue-filter").value;
    const data = await api(`/api/teacher/submissions?status=${encodeURIComponent(status)}`);
    queue = data.submissions || [];
    renderQueue();
  } catch (error) {
    queueError(error);
  }
}

function renderQueue() {
  $("#queue-status").textContent = `${queue.length} submission${queue.length === 1 ? "" : "s"}`;
  $("#submission-list").innerHTML = queue.length ? queue.map((item) => `
    <button class="submission-item ${item.id === activeId ? "active" : ""}" data-id="${item.id}" type="button">
      <div><strong>${escapeHtml(item.display_name)}</strong><span class="queue-state">${escapeHtml(statusLabel(item.status))}</span></div>
      <span>${escapeHtml(item.student_code)} · ${item.task_type === "task1" ? "Task 1" : item.task_type === "task2" ? "Task 2" : "Free writing"}</span>
      <small>${escapeHtml(item.prompt_title)} · ${item.word_count} words</small>
    </button>`).join("") : `<div class="annotation-empty">No submissions in this view.</div>`;
  $$(".submission-item").forEach((button) => button.addEventListener("click", () => openSubmission(button.dataset.id)));
}

function bandOptions(selected = 6.5) {
  const values = [];
  for (let value = 0; value <= 9; value += 0.5) values.push(value);
  return values.map((value) => `<option value="${value}" ${Number(selected) === value ? "selected" : ""}>${value.toFixed(1)}</option>`).join("");
}

function selectionOffsets(root, range) {
  if (!range || !root.contains(range.commonAncestorContainer)) return null;
  const before = range.cloneRange();
  before.selectNodeContents(root);
  before.setEnd(range.startContainer, range.startOffset);
  const start = before.toString().length;
  const text = range.toString();
  return text.trim() ? { start, end: start + text.length, text } : null;
}

function captureSelection() {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return;
  const offsets = selectionOffsets($("#review-essay"), selection.getRangeAt(0));
  if (offsets) selectedRange = offsets;
}

function overlaps(start, end) {
  return annotations.some((item) => start < item.endOffset && end > item.startOffset);
}

function addAnnotation(kind) {
  if (!selectedRange) {
    toast("Select words or a sentence in the essay first.");
    $("#review-essay").focus();
    return;
  }
  if (overlaps(selectedRange.start, selectedRange.end)) {
    toast("That text already has a comment.");
    return;
  }
  const input = $("#annotation-comment");
  const fallback = kind === "strong" ? "This is clear, relevant and well controlled." : "Revise this section for clearer meaning or more accurate language.";
  annotations.push({
    id: `local-${Date.now()}`,
    startOffset: selectedRange.start,
    endOffset: selectedRange.end,
    kind,
    comment: input.value.trim() || fallback,
  });
  annotations.sort((a, b) => a.startOffset - b.startOffset);
  selectedRange = null;
  input.value = "";
  renderAnnotatedEssay();
  toast("Inline comment added.");
}

function renderAnnotatedEssay() {
  if (!detail) return;
  const essay = detail.submission.essay;
  let cursor = 0;
  let html = "";
  annotations.forEach((item) => {
    if (item.startOffset < cursor || item.endOffset > essay.length) return;
    html += escapeHtml(essay.slice(cursor, item.startOffset));
    html += `<mark class="${item.kind === "revision" ? "revision" : ""} ${item.id === activeAnnotationId ? "active" : ""}" data-annotation-id="${item.id}">${escapeHtml(essay.slice(item.startOffset, item.endOffset))}</mark>`;
    cursor = item.endOffset;
  });
  html += escapeHtml(essay.slice(cursor));
  $("#review-essay").innerHTML = html;
  $("#annotation-list").innerHTML = annotations.length ? annotations.map((item) => `
    <article class="annotation-card ${item.kind}" data-card-id="${item.id}">
      <strong>${item.kind === "strong" ? "Strong writing" : "Needs revision"}</strong>
      <p>${escapeHtml(item.comment)}</p>
      <button type="button" data-remove-id="${item.id}">Remove</button>
    </article>`).join("") : `<div class="annotation-empty">Select evidence in the essay and add a comment. Comments will appear here.</div>`;
  $$('[data-annotation-id]').forEach((mark) => mark.addEventListener("click", () => focusAnnotation(mark.dataset.annotationId)));
  $$('[data-card-id]').forEach((card) => card.addEventListener("click", () => focusAnnotation(card.dataset.cardId)));
  $$('[data-remove-id]').forEach((button) => button.addEventListener("click", (event) => {
    event.stopPropagation();
    annotations = annotations.filter((item) => item.id !== button.dataset.removeId);
    renderAnnotatedEssay();
  }));
}

function focusAnnotation(id) {
  activeAnnotationId = id;
  renderAnnotatedEssay();
}

function updateOverall() {
  const scores = ["tr", "cc", "lr", "gra"].map((id) => Number($(`#score-${id}`).value));
  const overall = Math.round((scores.reduce((sum, value) => sum + value, 0) / 4) * 2) / 2;
  $("#overall-band").textContent = overall.toFixed(1);
}

async function openSubmission(id) {
  activeId = id;
  renderQueue();
  $("#review-empty").hidden = false;
  $("#review-empty").innerHTML = `<span>…</span><h2>Opening submission</h2><p>Loading the essay and saved review.</p>`;
  $("#review-workspace").hidden = true;
  try {
    detail = await api(`/api/teacher/submissions/${id}`);
    annotations = (detail.annotations || []).map((item) => ({
      id: item.id,
      startOffset: item.start_offset,
      endOffset: item.end_offset,
      kind: item.kind,
      comment: item.comment,
    }));
    selectedRange = null;
    renderDetail();
  } catch (error) {
    $("#review-empty").innerHTML = `<div class="error-card"><strong>Could not open this submission.</strong><br>${escapeHtml(error.message)}</div>`;
  }
}

function renderDetail() {
  const item = detail.submission;
  $("#review-empty").hidden = true;
  $("#review-workspace").hidden = false;
  $("#submission-task").textContent = item.task_type === "task1" ? "Academic Task 1" : item.task_type === "task2" ? "Task 2" : "Free writing";
  $("#submission-student").textContent = item.display_name;
  $("#submission-meta").textContent = `${item.student_code}${item.student_email ? ` · ${item.student_email}` : ""} · Submitted ${new Date(`${item.submitted_at}Z`).toLocaleString()}`;
  $("#submission-state").textContent = statusLabel(item.status);
  $("#submission-title").textContent = item.prompt_title;
  $("#submission-prompt").textContent = item.prompt_text;
  $("#submission-word-count").textContent = `${item.word_count} words`;
  $("#task-score-label").textContent = item.task_type === "task1" ? "Task Achievement" : "Task Response";
  const defaults = {
    tr: item.task_response ?? 6.5,
    cc: item.coherence_cohesion ?? 6.5,
    lr: item.lexical_resource ?? 6.5,
    gra: item.grammar_accuracy ?? 6.5,
  };
  Object.entries(defaults).forEach(([id, value]) => { $(`#score-${id}`).innerHTML = bandOptions(value); });
  $("#feedback-glow").value = item.glow || "";
  $("#feedback-grow").value = item.grow || "";
  $("#feedback-next").value = item.next_step || "";
  $("#private-note").value = item.private_note || "";
  $("#save-status").textContent = item.reviewed_at ? `Last saved ${new Date(`${item.reviewed_at}Z`).toLocaleString()}` : "Not saved yet";
  updateOverall();
  renderAnnotatedEssay();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function reviewPayload() {
  return {
    taskResponse: Number($("#score-tr").value),
    coherenceCohesion: Number($("#score-cc").value),
    lexicalResource: Number($("#score-lr").value),
    grammarAccuracy: Number($("#score-gra").value),
    glow: $("#feedback-glow").value.trim(),
    grow: $("#feedback-grow").value.trim(),
    nextStep: $("#feedback-next").value.trim(),
    privateNote: $("#private-note").value.trim(),
    annotations,
  };
}

async function saveReview({ silent = false } = {}) {
  if (!activeId) return false;
  const button = $("#save-review");
  button.disabled = true;
  $("#save-status").textContent = "Saving…";
  try {
    const result = await api(`/api/teacher/submissions/${activeId}/review`, { method: "PUT", body: JSON.stringify(reviewPayload()) });
    $("#overall-band").textContent = Number(result.overallBand).toFixed(1);
    $("#save-status").textContent = "Review saved.";
    if (!silent) toast("Review saved to D1.");
    await loadQueue();
    return true;
  } catch (error) {
    $("#save-status").textContent = error.message;
    return false;
  } finally {
    button.disabled = false;
  }
}

async function returnReview() {
  if (!activeId) return;
  const button = $("#return-review");
  button.disabled = true;
  try {
    const saved = await saveReview({ silent: true });
    if (!saved) return;
    await api(`/api/teacher/submissions/${activeId}/return`, { method: "POST", body: "{}" });
    $("#submission-state").textContent = "Returned";
    $("#save-status").textContent = "Returned to the student.";
    toast("Review returned to the student.");
    await loadQueue();
  } catch (error) {
    $("#save-status").textContent = error.message;
  } finally {
    button.disabled = false;
  }
}

$("#refresh-queue").addEventListener("click", loadQueue);
$("#queue-filter").addEventListener("change", loadQueue);
$("#review-essay").addEventListener("mouseup", captureSelection);
$("#review-essay").addEventListener("keyup", captureSelection);
$("#add-strong").addEventListener("click", () => addAnnotation("strong"));
$("#add-revision").addEventListener("click", () => addAnnotation("revision"));
$$('.score-fields select').forEach((select) => select.addEventListener("change", updateOverall));
$("#save-review").addEventListener("click", () => saveReview());
$("#return-review").addEventListener("click", returnReview);

loadQueue();
