-- =============================================
-- EMMDRA EMPIRE DATABASE SETUP SCRIPT
-- =============================================
-- Run this entire script in your Supabase SQL Editor
-- https://supabase.com/dashboard/project/hsbwnsmfrfydxwxqaxiu/sql

-- =============================================
-- 1️⃣ DROP EXISTING TABLES (Clean Slate)
-- =============================================

DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS workshops CASCADE;
DROP TABLE IF EXISTS diy_tutorials CASCADE;
DROP TABLE IF EXISTS blogs CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- =============================================
-- 2️⃣ CREATE FRESH TABLES
-- =============================================

-- Products Table (Fashion, Accessories, Beauty)
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  short_description TEXT,
  description TEXT,
  category TEXT NOT NULL,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blogs Table (Lifestyle, Fashion, Beauty Content)
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  category TEXT NOT NULL,
  featured_image TEXT,
  excerpt TEXT,
  body TEXT,
  tags TEXT[],
  published BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DIY Tutorials Table (Step-by-step guides)
CREATE TABLE diy_tutorials (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  category TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  steps JSONB NOT NULL, -- Array of {title, description, image_url}
  materials TEXT[],
  estimated_time TEXT,
  cover_image TEXT,
  images TEXT[],
  published BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workshops Table (Scheduled sessions)
CREATE TABLE workshops (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10,2),
  schedule JSONB, -- {date, time, duration, location}
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  instructor TEXT,
  cover_image TEXT,
  images TEXT[],
  status TEXT CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')) DEFAULT 'upcoming',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings Table (Contact form submissions)
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_type TEXT,
  message TEXT,
  status TEXT CHECK (status IN ('new', 'seen', 'replied', 'completed')) DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 3️⃣ ENABLE ROW-LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE diy_tutorials ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Public read access for content tables
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read blogs" ON blogs FOR SELECT USING (published = true);
CREATE POLICY "Public read diy_tutorials" ON diy_tutorials FOR SELECT USING (published = true);
CREATE POLICY "Public read workshops" ON workshops FOR SELECT USING (status = 'upcoming' OR status = 'ongoing');

-- Public insert for bookings (contact forms)
CREATE POLICY "Public insert bookings" ON bookings FOR INSERT WITH CHECK (true);

-- Admin-only write access (you'll need to create admin role check)
-- For now, allowing all writes for development
CREATE POLICY "Allow all writes products" ON products FOR ALL USING (true);
CREATE POLICY "Allow all writes blogs" ON blogs FOR ALL USING (true);
CREATE POLICY "Allow all writes diy_tutorials" ON diy_tutorials FOR ALL USING (true);
CREATE POLICY "Allow all writes workshops" ON workshops FOR ALL USING (true);

-- =============================================
-- 4️⃣ POPULATE INITIAL CONTENT
-- =============================================

-- Insert Products
INSERT INTO products (name, price, short_description, description, category, image_url) VALUES
('Premium Leather Handbag', 45000.00, 'Elegant genuine leather handbag', 'Handcrafted from premium Nigerian leather with attention to detail. Features multiple compartments and adjustable strap.', 'Accessories', '/images/Accessories.png'),
('Classic White Sneakers', 25000.00, 'Comfortable everyday sneakers', 'Versatile white sneakers perfect for casual and semi-formal occasions. Made with breathable materials.', 'Fashion', '/images/AdultWearsAndFashion.png'),
('Luxury Skincare Set', 35000.00, 'Complete skincare routine', 'Premium skincare products including cleanser, toner, serum, and moisturizer for radiant skin.', 'Beauty', '/images/beautyHub.png'),
('Designer Kids Dress', 18000.00, 'Adorable dress for little ones', 'Beautifully designed dress made from soft, comfortable fabric. Perfect for special occasions.', 'Kids Fashion', '/images/Kiddies.png'),
('Statement Earrings', 8500.00, 'Bold and beautiful earrings', 'Eye-catching statement earrings that add glamour to any outfit. Available in gold and silver.', 'Accessories', '/images/Accessories.png');

-- Insert Blogs
INSERT INTO blogs (title, slug, category, excerpt, body, tags, featured_image) VALUES
('5 Essential Fashion Tips for Nigerian Weather', 'fashion-tips-nigerian-weather', 'Fashion',
'Learn how to dress comfortably and stylishly in Nigeria''s tropical climate with these expert tips.',
'Our comprehensive guide covers breathable fabrics, layering techniques, and must-have accessories for staying cool while looking chic. From corporate wear to weekend casual, discover how to beat the heat in style.',
'{"fashion", "nigerian style", "tropical weather", "summer fashion"}'::TEXT[],
'/images/EmmdraFashionDesignAndAccessories.png'),

('DIY Natural Beauty Remedies at Home', 'diy-natural-beauty-remedies', 'Beauty',
'Discover simple, effective beauty treatments using ingredients from your kitchen.',
'From honey face masks to coconut oil hair treatments, learn how to create spa-quality beauty products at home using natural, affordable ingredients that actually work.',
'{"beauty", "DIY", "natural remedies", "skincare"}'::TEXT[],
'/images/beautyHub.png'),

('Building a Capsule Wardrobe for Busy Professionals', 'capsule-wardrobe-professionals', 'Lifestyle',
'Streamline your morning routine with a carefully curated professional wardrobe.',
'Learn how to build a versatile collection of timeless pieces that mix and match effortlessly, saving time and money while maintaining a polished professional image.',
'{"wardrobe", "professional", "capsule wardrobe", "productivity"}'::TEXT[],
'/images/EmmdraGallary1.JPG');

-- Insert DIY Tutorials
INSERT INTO diy_tutorials (title, slug, category, difficulty, steps, materials, estimated_time, cover_image) VALUES
('Handmade Beaded Necklace', 'handmade-beaded-necklace', 'Accessories', 'Beginner',
'[{"title": "Gather Materials", "description": "Collect all beads, string, and clasps", "image_url": "/images/EmmdraGallary2.JPG"}, {"title": "Design Pattern", "description": "Plan your bead pattern on a flat surface", "image_url": "/images/EmmdraGallary3.png"}, {"title": "String Beads", "description": "Thread beads onto string in your chosen pattern", "image_url": "/images/EmmdraGallary4.png"}, {"title": "Add Clasp", "description": "Secure ends with crimp beads and clasp", "image_url": "/images/EmmdraLogo.png"}]'::JSONB,
'{"assorted beads", "beading string", "crimp beads", "clasp", "scissors"}'::TEXT[],
'45 minutes',
'/images/EmmdraGallary1.JPG'),

('Natural Hair Treatment Mask', 'natural-hair-treatment-mask', 'Beauty', 'Beginner',
'[{"title": "Mix Ingredients", "description": "Combine honey, coconut oil, and essential oils", "image_url": "/images/beautyHub.png"}, {"title": "Apply to Hair", "description": "Section hair and apply mask evenly", "image_url": "/images/EmmdraFashionDesignAndAccessories.png"}, {"title": "Massage Scalp", "description": "Gently massage for 5 minutes", "image_url": "/images/EmmdraGallary2.JPG"}, {"title": "Rinse Thoroughly", "description": "Wash with lukewarm water and mild shampoo", "image_url": "/images/EmmdraGallary3.png"}]'::JSONB,
'{"honey", "coconut oil", "lavender oil", "shower cap"}'::TEXT[],
'30 minutes',
'/images/beautyHub.png');

-- Insert Workshops
INSERT INTO workshops (title, slug, description, category, price, schedule, max_participants, instructor, cover_image) VALUES
('Fashion Styling Masterclass', 'fashion-styling-masterclass', 'Learn professional styling techniques and build your signature look', 'Fashion', 25000.00,
'{"date": "2024-02-15", "time": "10:00 AM", "duration": "3 hours", "location": "Emmdra Studio, Enugu"}'::JSONB,
20, 'Emmanuel Chuka', '/images/EmmdraFashionDesignAndAccessories.png'),
('DIY Jewelry Making Workshop', 'diy-jewelry-making', 'Create beautiful handmade jewelry while learning essential crafting skills', 'Crafts', 15000.00,
'{"date": "2024-02-22", "time": "2:00 PM", "duration": "4 hours", "location": "Emmdra Workshop Space"}'::JSONB,
15, 'Chidera Lois', '/images/EmmdraGallary2.JPG');

-- =============================================
-- 6️⃣ VALIDATION QUERIES (Run these to verify)
-- =============================================

-- Check all tables have content
SELECT 'products' as table_name, COUNT(*) as count FROM products
UNION ALL
SELECT 'blogs' as table_name, COUNT(*) as count FROM blogs
UNION ALL
SELECT 'diy_tutorials' as table_name, COUNT(*) as count FROM diy_tutorials
UNION ALL
SELECT 'workshops' as table_name, COUNT(*) as count FROM workshops
UNION ALL
SELECT 'bookings' as table_name, COUNT(*) as count FROM bookings;

-- Sample data verification
SELECT id, name, category, price FROM products LIMIT 3;
SELECT id, title, category FROM blogs LIMIT 3;
SELECT id, title, category, difficulty FROM diy_tutorials LIMIT 3;
SELECT id, title, category, price FROM workshops LIMIT 3;

-- =============================================
-- 🎉 SETUP COMPLETE
-- =============================================

-- Your Emmdra Empire database is now ready!
-- Next steps:
-- 1. Test the contact form (should create bookings)
-- 2. Verify admin dashboard can read/write data
-- 3. Confirm email notifications work
-- 4. Deploy to production when ready
