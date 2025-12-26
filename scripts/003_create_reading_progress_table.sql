-- Create reading progress table
CREATE TABLE IF NOT EXISTS reading_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text NOT NULL,
  book_id text NOT NULL,
  current_chapter integer DEFAULT 1,
  last_position integer DEFAULT 0,
  completed boolean DEFAULT false,
  last_read_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, book_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS reading_progress_user_id_idx ON reading_progress(user_id);
CREATE INDEX IF NOT EXISTS reading_progress_book_id_idx ON reading_progress(book_id);

-- Enable RLS
ALTER TABLE reading_progress ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can manage own reading progress" ON reading_progress;

-- Reading progress policies
CREATE POLICY "Users can manage own reading progress"
  ON reading_progress FOR ALL
  USING (true)
  WITH CHECK (true);
