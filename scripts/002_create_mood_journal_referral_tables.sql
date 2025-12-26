-- Create mood tracking table
CREATE TABLE IF NOT EXISTS moods (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text NOT NULL,
  mood_value integer NOT NULL CHECK (mood_value >= 1 AND mood_value <= 5),
  note text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS moods_user_id_idx ON moods(user_id);
CREATE INDEX IF NOT EXISTS moods_created_at_idx ON moods(created_at DESC);

-- Enable RLS
ALTER TABLE moods ENABLE ROW LEVEL SECURITY;

-- Drop existing policies before creating new ones to prevent errors
DROP POLICY IF EXISTS "Users can insert own moods" ON moods;
DROP POLICY IF EXISTS "Users can read own moods" ON moods;

-- Allow users to insert their own moods
CREATE POLICY "Users can insert own moods"
  ON moods FOR INSERT
  WITH CHECK (true);

-- Allow users to read their own moods
CREATE POLICY "Users can read own moods"
  ON moods FOR SELECT
  USING (true);

-- Create journal entries table
CREATE TABLE IF NOT EXISTS journal_entries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  mood_tag text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS journal_entries_user_id_idx ON journal_entries(user_id);
CREATE INDEX IF NOT EXISTS journal_entries_created_at_idx ON journal_entries(created_at DESC);

-- Enable RLS
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can manage own journal entries" ON journal_entries;

-- Journal policies
CREATE POLICY "Users can manage own journal entries"
  ON journal_entries FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id text NOT NULL,
  referral_code text UNIQUE NOT NULL,
  referred_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create conversions table to track who was referred
CREATE TABLE IF NOT EXISTS referral_conversions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  referral_code text NOT NULL,
  referred_user_id text NOT NULL,
  converted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(referral_code, referred_user_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS referrals_referrer_id_idx ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS referrals_code_idx ON referrals(referral_code);
CREATE INDEX IF NOT EXISTS referral_conversions_code_idx ON referral_conversions(referral_code);

-- Enable RLS
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_conversions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can read referrals" ON referrals;
DROP POLICY IF EXISTS "Users can create own referral codes" ON referrals;
DROP POLICY IF EXISTS "Anyone can create conversions" ON referral_conversions;
DROP POLICY IF EXISTS "Anyone can read conversions" ON referral_conversions;

-- Referral policies
CREATE POLICY "Anyone can read referrals"
  ON referrals FOR SELECT
  USING (true);

CREATE POLICY "Users can create own referral codes"
  ON referrals FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can create conversions"
  ON referral_conversions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read conversions"
  ON referral_conversions FOR SELECT
  USING (true);
