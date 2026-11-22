# RubricLab IELTS Writing

RubricLab is an English-only IELTS Writing practice site with:

- Academic Task 1, Task 2 and free-writing modes.
- A band-based vocabulary and collocation library.
- Interactive practice activities.
- A manual teacher-review workflow with four IELTS rubric scores.
- Inline evidence highlights and Glow–Grow–Go feedback.

The site does not generate automatic AI scores. Students submit an essay, teachers assess it manually, and students retrieve the returned review with a private submission token.

Current static app: https://rubriclab-writing.hailx.chatgpt.site

## Cloudflare architecture

- Cloudflare Workers serves the static site and `/api/*` routes.
- D1 stores students, submissions, rubric reviews and inline annotations.
- Cloudflare Access protects `/teacher.html` and `/api/teacher/*`.
- No plaintext passwords are stored. Student and submission tokens are stored as SHA-256 hashes.
- Turnstile validation is enabled automatically when the `TURNSTILE_SECRET` Worker secret exists.

## First Cloudflare deployment

1. In Cloudflare Dashboard, create a D1 database named `rubriclab-production`.
2. Copy its database ID into `wrangler.jsonc`, replacing `PASTE_D1_DATABASE_ID_HERE`.
3. Set `TEACHER_EMAILS` in `wrangler.jsonc` to a comma-separated allowlist, for example `teacher@example.com`.
4. Run `npm install` and `npm run check` locally.
5. Apply the database migration with `npm run db:remote` or paste `migrations/0001_manual_review.sql` into the D1 Console and execute it once.
6. Deploy with `npm run deploy`, or connect this GitHub repository in Workers Builds and use `npx wrangler deploy` as the deploy command.
7. In Cloudflare Zero Trust, protect both `/teacher.html` and `/api/teacher/*` with an Access application and an email OTP allow policy.

The Worker rejects teacher API requests unless Cloudflare Access supplies both the authenticated email and Access JWT headers. `DEV_TEACHER_MODE=true` is available only for local development through an untracked `.dev.vars` file.

## Local development

```sh
npm install
npm run db:local
npm run dev
```

Copy `.dev.vars.example` to `.dev.vars` to open the teacher dashboard locally. Do not commit `.dev.vars`.

## API outline

- `POST /api/submissions` — create a student profile if necessary and submit an essay.
- `GET /api/submissions/:id` — retrieve one submission using its bearer token.
- `GET /api/teacher/submissions` — list the manual-review queue.
- `GET /api/teacher/submissions/:id` — open the full essay and existing review.
- `PUT /api/teacher/submissions/:id/review` — save scores, Glow–Grow–Go feedback and inline annotations.
- `POST /api/teacher/submissions/:id/return` — return a completed review to the student.

## Privacy notes

Collect only information needed for teaching. Establish a deletion and retention policy before using the site with real learners. Do not place Cloudflare tokens, Turnstile secrets or student data in the public repository.
