-- Create waitlist table for email signups
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source TEXT DEFAULT 'landing_page',
  subscribed BOOLEAN DEFAULT true
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for waitlist signups from unauthenticated users)
CREATE POLICY "Allow public waitlist signups" 
  ON waitlist 
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- Only allow service role to read/update/delete
CREATE POLICY "Service role full access" 
  ON waitlist 
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);
