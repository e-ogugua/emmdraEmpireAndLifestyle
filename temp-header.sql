📋 **COPY THIS ENTIRE SCRIPT TO SUPABASE:**

-- =============================================
-- EMMDRA EMPIRE DATABASE POPULATION SCRIPT  
-- =============================================

-- Clear existing data to prevent duplicate key errors
DELETE FROM bookings;
DELETE FROM workshops; 
DELETE FROM diy_tutorials;
DELETE FROM blogs;
DELETE FROM products;

-- Reset sequences for clean auto-increment
ALTER SEQUENCE IF EXISTS products_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS blogs_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS diy_tutorials_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS workshops_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS bookings_id_seq RESTART WITH 1;

-- Verify tables are empty before population
SELECT 'products' as table_name, COUNT(*) as count FROM products
UNION ALL
SELECT 'blogs' as table_name, COUNT(*) as count FROM blogs
UNION ALL
SELECT 'diy_tutorials' as table_name, COUNT(*) as count FROM diy_tutorials
UNION ALL
SELECT 'workshops' as table_name, COUNT(*) as count FROM workshops
UNION ALL
SELECT 'bookings' as table_name, COUNT(*) as count FROM bookings;

