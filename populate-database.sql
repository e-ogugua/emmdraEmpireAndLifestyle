-- =============================================
-- EMMDRA EMPIRE DATA POPULATION SCRIPT
-- =============================================
-- Run this in Supabase SQL Editor after creating tables
-- https://supabase.com/dashboard/project/hsbwnsmfrfydxwxqaxiu/sql

-- =============================================
-- 1️⃣ POPULATE PRODUCTS TABLE
-- =============================================

INSERT INTO products (name, price, short_description, description, category, image_url) VALUES
-- Fashion Items
('Premium Leather Handbag', 45000.00, 'Elegant genuine leather handbag', 'Handcrafted from premium Nigerian leather with attention to detail. Features multiple compartments and adjustable strap.', 'Accessories', '/images/Accessories.png'),
('Classic White Sneakers', 25000.00, 'Comfortable everyday sneakers', 'Versatile white sneakers perfect for casual and semi-formal occasions. Made with breathable materials.', 'Fashion', '/images/AdultWearsAndFashion.png'),
('Designer Kids Dress', 18000.00, 'Adorable dress for little ones', 'Beautifully designed dress made from soft, comfortable fabric. Perfect for special occasions.', 'Kids Fashion', '/images/Kiddies.png'),
('Statement Earrings', 8500.00, 'Bold and beautiful earrings', 'Eye-catching statement earrings that add glamour to any outfit. Available in gold and silver.', 'Accessories', '/images/Accessories.png'),

-- Beauty Products
('Luxury Skincare Set', 35000.00, 'Complete skincare routine', 'Premium skincare products including cleanser, toner, serum, and moisturizer for radiant skin.', 'Beauty', '/images/beautyHub.png'),
('Natural Hair Oil', 12000.00, 'Nourishing hair treatment', 'Organic hair oil blend for healthy, shiny hair. Contains coconut, jojoba, and argan oils.', 'Beauty', '/images/beautyHub.png'),

-- More Fashion
('Ankara Print Blouse', 15000.00, 'Traditional meets modern', 'Beautiful Ankara print blouse with contemporary cut. Perfect for office or casual wear.', 'Fashion', '/images/AdultWearsAndFashion.png'),
('Beaded Necklace Set', 7500.00, 'Handcrafted beaded jewelry', 'Traditional beaded necklace set made by local artisans. Each piece tells a story.', 'Accessories', '/images/Accessories.png'),
('Kids Ankara Outfit', 12000.00, 'Cultural pride for children', 'Adorable Ankara outfit for kids. Comfortable fit with vibrant traditional patterns.', 'Kids Fashion', '/images/Kiddies.png'),
('Luxury Perfume', 28000.00, 'Signature fragrance collection', 'Premium perfume with notes of jasmine, vanilla, and sandalwood. Long-lasting scent.', 'Beauty', '/images/beautyHub.png');

-- =============================================
-- 2️⃣ POPULATE BLOGS TABLE
-- =============================================

INSERT INTO blogs (title, slug, category, excerpt, body, tags, featured_image, published) VALUES
('5 Essential Fashion Tips for Nigerian Weather', 'fashion-tips-nigerian-weather', 'Fashion',
'Learn how to dress comfortably and stylishly in Nigeria''s tropical climate with these expert tips.',
'Our comprehensive guide covers breathable fabrics, layering techniques, and must-have accessories for staying cool while looking chic. From corporate wear to weekend casual, discover how to beat the heat in style. We''ll show you how to choose the right materials, colors, and silhouettes that work perfectly for our climate while maintaining your personal style.',
'{"fashion", "nigerian style", "tropical weather", "summer fashion"}',
'/images/EmmdraFashionDesignAndAccessories.png', true),

('DIY Natural Beauty Remedies at Home', 'diy-natural-beauty-remedies', 'Beauty',
'Discover simple, effective beauty treatments using ingredients from your kitchen.',
'From honey face masks to coconut oil hair treatments, learn how to create spa-quality beauty products at home using natural, affordable ingredients that actually work. These remedies have been passed down through generations and are perfect for maintaining healthy, glowing skin without harsh chemicals.',
'{"beauty", "DIY", "natural remedies", "skincare"}',
'/images/beautyHub.png', true),

('Building a Capsule Wardrobe for Busy Professionals', 'capsule-wardrobe-professionals', 'Lifestyle',
'Streamline your morning routine with a carefully curated professional wardrobe.',
'Learn how to build a versatile collection of timeless pieces that mix and match effortlessly, saving time and money while maintaining a polished professional image. A capsule wardrobe is about quality over quantity, choosing pieces that work together seamlessly.',
'{"wardrobe", "professional", "capsule wardrobe", "productivity"}',
'/images/EmmdraGallary1.JPG', true),

('The Art of Accessorizing: Less is More', 'art-of-accessorizing', 'Fashion',
'Master the subtle art of choosing the right accessories to elevate any outfit.',
'Accessories can make or break an outfit. Learn when to go bold and when to keep it minimal, how to mix metals, and how to choose pieces that reflect your personality while complementing your style. Sometimes the smallest details make the biggest impact.',
'{"fashion", "accessories", "style tips", "minimalism"}',
'/images/Accessories.png', true),

('Skincare Routine for Different Skin Types', 'skincare-routine-guide', 'Beauty',
'Find the perfect skincare routine tailored to your specific skin type and concerns.',
'Whether you have oily, dry, combination, or sensitive skin, we break down the essential steps and products you need. Learn about ingredient compatibility, application techniques, and how to build a routine that actually delivers results.',
'{"beauty", "skincare", "routine", "skin types"}',
'/images/beautyHub.png', true);

-- =============================================
-- 3️⃣ POPULATE DIY TUTORIALS TABLE
-- =============================================

INSERT INTO diy_tutorials (title, slug, category, difficulty, steps, materials, estimated_time, cover_image, published) VALUES
('Handmade Beaded Necklace', 'handmade-beaded-necklace', 'Accessories', 'Beginner',
'{"title": "Gather Materials", "description": "Collect all beads, string, and clasps", "image_url": "/images/EmmdraGallary2.JPG"}, {"title": "Design Pattern", "description": "Plan your bead pattern on a flat surface", "image_url": "/images/EmmdraGallary3.png"}, {"title": "String Beads", "description": "Thread beads onto string in your chosen pattern", "image_url": "/images/EmmdraGallary4.png"}, {"title": "Add Clasp", "description": "Secure ends with crimp beads and clasp", "image_url": "/images/EmmdraLogo.png"}',
'{"assorted beads", "beading string", "crimp beads", "clasp", "scissors"}',
'45 minutes',
'/images/EmmdraGallary1.JPG', true),

('Natural Hair Treatment Mask', 'natural-hair-treatment-mask', 'Beauty', 'Beginner',
'{"title": "Mix Ingredients", "description": "Combine honey, coconut oil, and essential oils", "image_url": "/images/beautyHub.png"}, {"title": "Apply to Hair", "description": "Section hair and apply mask evenly", "image_url": "/images/EmmdraFashionDesignAndAccessories.png"}, {"title": "Massage Scalp", "description": "Gently massage for 5 minutes", "image_url": "/images/EmmdraGallary2.JPG"}, {"title": "Rinse Thoroughly", "description": "Wash with lukewarm water and mild shampoo", "image_url": "/images/EmmdraGallary3.png"}',
'{"honey", "coconut oil", "lavender oil", "shower cap"}',
'30 minutes',
'/images/beautyHub.png', true),

('DIY Ankara Throw Pillow', 'diy-ankara-throw-pillow', 'Home Decor', 'Intermediate',
'{"title": "Cut Fabric", "description": "Cut Ankara fabric to pillow size with seam allowance", "image_url": "/images/EmmdraFashionDesignAndAccessories.png"}, {"title": "Sew Sides", "description": "Sew three sides together with right sides facing", "image_url": "/images/EmmdraGallary2.JPG"}, {"title": "Insert Filling", "description": "Turn right side out and stuff with filling", "image_url": "/images/EmmdraGallary3.png"}, {"title": "Close Opening", "description": "Hand stitch the opening closed", "image_url": "/images/EmmdraGallary4.png"}',
'{"Ankara fabric", "sewing machine", "thread", "scissors", "fiber fill", "pins"}',
'2 hours',
'/images/EmmdraGallary1.JPG', true);

-- =============================================
-- 4️⃣ POPULATE WORKSHOPS TABLE
-- =============================================

INSERT INTO workshops (title, slug, description, category, price, schedule, max_participants, instructor, cover_image, status) VALUES
('Fashion Styling Masterclass', 'fashion-styling-masterclass', 'Learn professional styling techniques and build your signature look', 'Fashion', 25000.00,
'{"date": "2024-02-15", "time": "10:00 AM", "duration": "3 hours", "location": "Emmdra Studio, Enugu"}',
20, 'Emmanuel Chuka', '/images/EmmdraFashionDesignAndAccessories.png', 'upcoming'),

('DIY Jewelry Making Workshop', 'diy-jewelry-making', 'Create beautiful handmade jewelry while learning essential crafting skills', 'Crafts', 15000.00,
'{"date": "2024-02-22", "time": "2:00 PM", "duration": "4 hours", "location": "Emmdra Workshop Space"}',
15, 'Chidera Lois', '/images/EmmdraGallary2.JPG', 'upcoming'),

('Natural Beauty Workshop', 'natural-beauty-workshop', 'Discover the secrets of natural beauty and create your own products', 'Beauty', 18000.00,
'{"date": "2024-03-01", "time": "11:00 AM", "duration": "2.5 hours", "location": "Emmdra Beauty Hub"}',
12, 'Amara Nwosu', '/images/beautyHub.png', 'upcoming');

-- =============================================
-- 5️⃣ CREATE INDEXES FOR PERFORMANCE
-- =============================================

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);
CREATE INDEX IF NOT EXISTS idx_diy_tutorials_category ON diy_tutorials(category);
CREATE INDEX IF NOT EXISTS idx_diy_tutorials_difficulty ON diy_tutorials(difficulty);
CREATE INDEX IF NOT EXISTS idx_workshops_category ON workshops(category);
CREATE INDEX IF NOT EXISTS idx_workshops_status ON workshops(status);

-- =============================================
-- 6️⃣ VALIDATION QUERIES
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
-- 🎉 DATA POPULATION COMPLETE
-- =============================================

-- Your Emmdra Empire database now has:
-- ✅ 10 Products (fashion, beauty, accessories)
-- ✅ 5 Blog Posts (fashion, beauty, lifestyle)
-- ✅ 3 DIY Tutorials (jewelry, beauty, home decor)
-- ✅ 3 Workshops (fashion, crafts, beauty)
-- ✅ Performance indexes for fast queries
-- ✅ Ready for production!

-- Next steps:
-- 1. Run: npx ts-node verify-database.ts
-- 2. Test your application locally
-- 3. Verify all pages load with content
-- 4. Test contact form functionality
