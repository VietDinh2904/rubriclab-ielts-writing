PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  email TEXT,
  student_code TEXT NOT NULL UNIQUE,
  access_token_hash TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL,
  access_token_hash TEXT NOT NULL UNIQUE,
  task_type TEXT NOT NULL CHECK (task_type IN ('task1', 'task2', 'free')),
  prompt_id TEXT,
  prompt_title TEXT NOT NULL,
  prompt_text TEXT NOT NULL,
  essay TEXT NOT NULL,
  target_band REAL,
  word_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'in_review', 'reviewed', 'returned')),
  submitted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  returned_at TEXT,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reviews (
  submission_id TEXT PRIMARY KEY,
  teacher_email TEXT NOT NULL,
  task_response REAL NOT NULL CHECK (task_response BETWEEN 0 AND 9),
  coherence_cohesion REAL NOT NULL CHECK (coherence_cohesion BETWEEN 0 AND 9),
  lexical_resource REAL NOT NULL CHECK (lexical_resource BETWEEN 0 AND 9),
  grammar_accuracy REAL NOT NULL CHECK (grammar_accuracy BETWEEN 0 AND 9),
  overall_band REAL NOT NULL CHECK (overall_band BETWEEN 0 AND 9),
  glow TEXT NOT NULL DEFAULT '',
  grow TEXT NOT NULL DEFAULT '',
  next_step TEXT NOT NULL DEFAULT '',
  private_note TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS annotations (
  id TEXT PRIMARY KEY,
  submission_id TEXT NOT NULL,
  start_offset INTEGER NOT NULL CHECK (start_offset >= 0),
  end_offset INTEGER NOT NULL CHECK (end_offset > start_offset),
  kind TEXT NOT NULL CHECK (kind IN ('strong', 'revision')),
  comment TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_submissions_status_time ON submissions(status, submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_student ON submissions(student_id, submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_annotations_submission ON annotations(submission_id, start_offset);
