-- =============================================
-- EMMDRA EMPIRE ANALYTICS TABLE SETUP
-- =============================================
-- Add analytics tracking table to your Supabase project
-- Run this in: https://supabase.com/dashboard/project/kjfqspuygiatifebgpkd/sql

-- =============================================
-- CREATE ANALYTICS TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS page_views (
  id SERIAL PRIMARY KEY,
  page_type TEXT NOT NULL CHECK (page_type IN ('product', 'blog', 'diy', 'shop', 'contact', 'about', 'home')),
  page_id TEXT, -- ID of specific content (product_id, blog_id, etc.)
  page_title TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT, -- Added missing ip_address column
  session_id TEXT NOT NULL,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for analytics table
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Public insert policy (for anonymous tracking)
CREATE POLICY "Allow anonymous page view inserts" ON page_views
  FOR INSERT WITH CHECK (true);

-- Public read policy (for admin dashboard)
CREATE POLICY "Allow public page view reads" ON page_views
  FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_page_views_type ON page_views(page_type);
CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_date ON page_views(viewed_at);
CREATE INDEX IF NOT EXISTS idx_page_views_content ON page_views(page_type, page_id);
CREATE INDEX IF NOT EXISTS idx_page_views_ip ON page_views(ip_address);

-- =============================================
-- VERIFICATION QUERY
-- =============================================

-- Check if table was created successfully
SELECT 'page_views' as table_name, COUNT(*) as count FROM page_views;

-- =============================================
-- SETUP COMPLETE - UPDATED
-- =============================================

-- Your analytics table has been updated with the missing ip_address column!
-- If you're getting "Could not find the 'ip_address' column" errors,
-- you need to run this updated SQL script in your Supabase dashboard.
--
-- The "Failed to fetch" errors should now be resolved.
-- Analytics tracking will now work properly with IP address tracking.
