-- =============================================
-- WORKSHOP REGISTRATIONS TABLE CREATION SCRIPT
-- =============================================
-- Run this in your Supabase SQL Editor if the table is missing

-- Drop table if exists (for clean recreation)
DROP TABLE IF EXISTS workshop_registrations CASCADE;

-- Create workshop registrations table
CREATE TABLE workshop_registrations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  workshop_name TEXT NOT NULL,
  workshop_date TEXT,
  experience_level TEXT,
  group_size TEXT DEFAULT '1',
  budget TEXT,
  special_requirements TEXT,
  message TEXT,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE workshop_registrations ENABLE ROW LEVEL SECURITY;

-- Allow public insert for workshop registrations
CREATE POLICY "Public insert workshop_registrations" ON workshop_registrations FOR INSERT WITH CHECK (true);

-- Allow admins to read/update (you can modify this based on your auth setup)
CREATE POLICY "Allow all operations workshop_registrations" ON workshop_registrations FOR ALL USING (true);

-- =============================================
-- VERIFICATION QUERY
-- =============================================

-- Check if table was created successfully
SELECT 'workshop_registrations' as table_name, COUNT(*) as count FROM workshop_registrations;

-- Show table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'workshop_registrations' 
ORDER BY ordinal_position;

-- =============================================
-- TEST INSERT (Optional)
-- =============================================

-- Test insert to verify table works
-- INSERT INTO workshop_registrations (name, email, workshop_name, message) 
-- VALUES ('Test User', 'test@example.com', 'Fashion Workshop', 'Test registration');

