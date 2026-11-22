import assert from "node:assert/strict";

const base = process.env.RUBRICLAB_BASE_URL || "http://127.0.0.1:8787";

async function request(path, options = {}) {
  const response = await fetch(`${base}${path}`, {
    ...options,
    headers: { "content-type": "application/json", ...(options.headers || {}) },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(`${response.status}: ${JSON.stringify(data)}`);
  return data;
}

const essay = "Public transport can reduce urban congestion when services are reliable and affordable. Frequent buses give commuters a practical alternative to private cars. For example, workers may leave their vehicles at home when an express route is faster than driving. However, local authorities must also provide safe connections between residential areas and major stations.";

const created = await request("/api/submissions", {
  method: "POST",
  body: JSON.stringify({
    studentName: "Smoke Test Student",
    taskType: "task2",
    promptId: "transport-test",
    promptTitle: "Transport · Congestion",
    promptText: "How can public transport reduce congestion?",
    essay,
    targetBand: 7,
  }),
});

assert.match(created.submissionId, /^[0-9a-f-]{36}$/i);
assert.ok(created.accessToken);
assert.ok(created.studentToken);
assert.match(created.studentCode, /^RL-/);

const queue = await request("/api/teacher/submissions");
assert.ok(queue.submissions.some((item) => item.id === created.submissionId));

const startOffset = essay.indexOf("Frequent buses");
const endOffset = essay.indexOf("cars.") + 5;
const saved = await request(`/api/teacher/submissions/${created.submissionId}/review`, {
  method: "PUT",
  body: JSON.stringify({
    taskResponse: 7,
    coherenceCohesion: 6.5,
    lexicalResource: 7,
    grammarAccuracy: 6.5,
    glow: "The example clearly supports the paragraph claim.",
    grow: "Develop the final recommendation with a specific mechanism.",
    nextStep: "Rewrite the final sentence and add one practical consequence.",
    privateNote: "Smoke test only.",
    annotations: [{ startOffset, endOffset, kind: "strong", comment: "Clear support and relevant explanation." }],
  }),
});

assert.equal(saved.overallBand, 7);
assert.equal(saved.annotationCount, 1);

await request(`/api/teacher/submissions/${created.submissionId}/return`, { method: "POST", body: "{}" });

const returned = await request(`/api/submissions/${created.submissionId}`, {
  headers: { authorization: `Bearer ${created.accessToken}` },
});

assert.equal(returned.submission.status, "returned");
assert.equal(returned.review.overallBand, 7);
assert.equal(returned.review.annotations.length, 1);
assert.equal(returned.review.annotations[0].comment, "Clear support and relevant explanation.");

console.log(`Smoke test passed for submission ${created.submissionId}`);
