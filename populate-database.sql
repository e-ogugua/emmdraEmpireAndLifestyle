-- =============================================
-- EMMDRA EMPIRE DATA POPULATION SCRIPT
-- =============================================
-- Run this in Supabase SQL Editor after creating tables
-- https://supabase.com/dashboard/project/hsbwnsmfrfydxwxqaxiu/sql

-- =============================================
-- ⚠️  IMPORTANT: CLEAR EXISTING DATA FIRST
-- =============================================
-- Run these commands if you have existing data:

-- DELETE FROM bookings;
-- DELETE FROM workshops;
-- DELETE FROM diy_tutorials;
-- DELETE FROM blogs;
-- DELETE FROM products;

-- =============================================
-- 1️⃣ POPULATE PRODUCTS TABLE
-- =============================================

INSERT INTO products (name, price, short_description, description, category, image_url) VALUES
-- Fashion Items
('Premium Leather Handbag', 45000.00, 'Elegant genuine leather handbag', 'Handcrafted from premium Nigerian leather with attention to detail. Features multiple compartments and adjustable strap.', 'Accessories', '/images/PremiumLeatherHandBags.png'),
('Classic White Sneakers', 25000.00, 'Comfortable everyday sneakers', 'Versatile white sneakers perfect for casual and semi-formal occasions. Made with breathable materials.', 'Fashion', '/images/pairOfShoes.png'),
('Designer Kids Dress', 18000.00, 'Adorable dress for little ones', 'Beautifully designed dress made from soft, comfortable fabric. Perfect for special occasions.', 'Kids Fashion', '/images/DesignerKidsDress.png'),
('Statement Earrings', 8500.00, 'Bold and beautiful earrings', 'Eye-catching statement earrings that add glamour to any outfit. Available in gold and silver.', 'Accessories', '/images/StatementEarrings.png'),

-- Beauty Products
('Luxury Skincare Set', 35000.00, 'Complete skincare routine', 'Premium skincare products including cleanser, toner, serum, and moisturizer for radiant skin.', 'Beauty', '/images/beautyHub.png'),
('Natural Hair Oil', 12000.00, 'Nourishing hair treatment', 'Organic hair oil blend for healthy, shiny hair. Contains coconut, jojoba, and argan oils.', 'Beauty', '/images/NaturalHairOil.png'),

-- More Fashion
('Ankara Print Blouse', 15000.00, 'Traditional meets modern', 'Beautiful Ankara print blouse with contemporary cut. Perfect for office or casual wear.', 'Fashion', '/images/AnkaraPrintBlouses.png'),
('Beaded Necklace Set', 7500.00, 'Handcrafted beaded jewelry', 'Traditional beaded necklace set made by local artisans. Each piece tells a story.', 'Accessories', '/images/BeadedNecklaceSet.png'),
('Kids Ankara Outfit', 12000.00, 'Cultural pride for children', 'Adorable Ankara outfit for kids. Comfortable fit with vibrant traditional patterns.', 'Kids Fashion', '/images/KidsAnkaraOutfit.png'),
('Luxury Perfume', 28000.00, 'Signature fragrance collection', 'Premium perfume with notes of jasmine, vanilla, and sandalwood. Long-lasting scent.', 'Beauty', '/images/LuxuryPerfume.png'),

-- New Products
('Eco-friendly Tote Bag', 8500.00, 'Sustainable shopping companion', 'Durable, eco-friendly tote bag made from recycled materials. Perfect for shopping and daily use.', 'Accessories', '/images/ToteBagReusable.png'),
('Organic Lip Balm', 3500.00, 'Natural lip nourishment', 'Organic lip balm made with beeswax and essential oils. Keeps lips soft and hydrated all day.', 'Beauty', '/images/OrganicLipBalm.png'),
('Silk Scarf', 12000.00, 'Luxury accessory essential', 'Premium silk scarf with elegant patterns. Perfect for adding sophistication to any outfit.', 'Accessories', '/images/SilkScarfLuxury.png'),
('Kids Craft Kit', 6500.00, 'Creative fun for children', 'Complete craft kit with beads, strings, and instructions. Encourages creativity and motor skills.', 'Kids Fashion', '/images/KidsCraftKitFunDIY.png'),
('Natural Face Mask Set', 9500.00, 'Organic skincare treatment', 'Set of natural face masks made with clay, honey, and botanical extracts for glowing skin.', 'Beauty', '/images/NaturalFaceMask.png'),
('Ankara Headwrap', 5500.00, 'Traditional elegance', 'Beautiful Ankara headwrap perfect for cultural events and everyday styling.', 'Accessories', '/images/AnkaraHeadwrapTraditiona.png'),
('Beaded Bracelet', 4200.00, 'Handcrafted elegance', 'Handmade beaded bracelet with traditional Nigerian beadwork patterns.', 'Accessories', '/images/BeadedBraceletHandmade.png'),
('Organic Shampoo', 7500.00, 'Gentle hair cleansing', 'Organic shampoo made with natural ingredients. Gentle on hair and scalp, promotes healthy growth.', 'Beauty', '/images/OrganicShampoo.png'),
('Kids Ankara Dress', 15000.00, 'Cultural celebration wear', 'Beautiful Ankara dress for children. Comfortable fit with vibrant traditional patterns.', 'Kids Fashion', '/images/KidsAnkaraDress.png'),
('Luxury Perfume Set', 45000.00, 'Complete fragrance collection', 'Luxury perfume set with multiple scents. Perfect gift for special occasions.', 'Beauty', '/images/LuxuryPerfumeSet.png');

-- =============================================
-- 2️⃣ POPULATE BLOGS TABLE
-- =============================================

INSERT INTO blogs (title, slug, category, excerpt, body, tags, featured_image, published) VALUES
('5 Essential Fashion Tips for Nigerian Weather', 'fashion-tips-nigerian-weather', 'Fashion',
'Learn how to dress comfortably and stylishly in Nigeria''s tropical climate with these expert tips.',
'Our comprehensive guide covers breathable fabrics, layering techniques, and must-have accessories for staying cool while looking chic. From corporate wear to weekend casual, discover how to beat the heat in style. We''ll show you how to choose the right materials, colors, and silhouettes that work perfectly for our climate while maintaining your personal style.',
'{"fashion", "nigerian style", "tropical weather", "summer fashion"}',
'/images/5EssentialFashionTipsforNigerianWeather.png', true),

('DIY Natural Beauty Remedies at Home', 'diy-natural-beauty-remedies', 'Beauty',
'Discover simple, effective beauty treatments using ingredients from your kitchen.',
'From honey face masks to coconut oil hair treatments, learn how to create spa-quality beauty products at home using natural, affordable ingredients that actually work. These remedies have been passed down through generations and are perfect for maintaining healthy, glowing skin without harsh chemicals.',
'{"beauty", "DIY", "natural remedies", "skincare"}',
'/images/DIYNaturalBeautyRemediesatHome.png', true),

('Building a Capsule Wardrobe for Busy Professionals', 'capsule-wardrobe-professionals', 'Lifestyle',
'Streamline your morning routine with a carefully curated professional wardrobe.',
'Learn how to build a versatile collection of timeless pieces that mix and match effortlessly, saving time and money while maintaining a polished professional image. A capsule wardrobe is about quality over quantity, choosing pieces that work together seamlessly.',
'{"wardrobe", "professional", "capsule wardrobe", "productivity"}',
'/images/BuildingaCapsuleWardrobeforBusyProfessionals.png', true),

('The Art of Accessorizing: Less is More', 'art-of-accessorizing', 'Fashion',
'Master the subtle art of choosing the right accessories to elevate any outfit.',
'Accessories can make or break an outfit. Learn when to go bold and when to keep it minimal, how to mix metals, and how to choose pieces that reflect your personality while complementing your style. Sometimes the smallest details make the biggest impact.',
'{"fashion", "accessories", "style tips", "minimalism"}',
'/images/EmmdraGallary4.png', true),

('Skincare Routine for Different Skin Types', 'skincare-routine-guide', 'Beauty',
'Find the perfect skincare routine tailored to your specific skin type and concerns.',
'Whether you have oily, dry, combination, or sensitive skin, we break down the essential steps and products you need. Learn about ingredient compatibility, application techniques, and how to build a routine that actually delivers results.',
'{"beauty", "skincare", "routine", "skin types"}',
'/images/SkincareRoutineforDifferentSkinTypes.png', true),

('Top 10 Fashion Accessories for 2025', 'top-10-fashion-accessories-2025', 'Fashion',
'Stay ahead of the trends with our curated selection of must-have accessories for the coming year.',
'From statement earrings to versatile bags, discover the pieces that will define 2025 fashion. These accessories are not just trends - they''re timeless investments that will elevate your style for years to come.',
'{"fashion", "accessories", "trends", "2025"}',
'/images/fashion1.png', true),

('Natural Skincare Tips for Busy Women', 'natural-skincare-tips-busy-women', 'Beauty',
'Maintain glowing skin even with a hectic schedule using these time-efficient natural beauty tips.',
'Busy women don''t have hours for complicated routines. Learn quick, effective natural skincare methods that fit into your daily life and deliver real results without expensive products or salon visits.',
'{"beauty", "skincare", "natural", "busy lifestyle"}',
'/images/beautyAndWellness.png', true),

('DIY Kids Crafts for Holidays', 'diy-kids-crafts-holidays', 'DIY',
'Keep children engaged during holidays with these fun, educational craft projects.',
'Transform holiday downtime into creative learning experiences. These projects are designed to be age-appropriate, budget-friendly, and most importantly, fun for the whole family.',
'{"DIY", "kids crafts", "holidays", "family activities"}',
'/images/DIYKidsCraftsforHolidays.png', true),

('5 Ways to Style Your Ankara', '5-ways-to-style-ankara', 'Fashion',
'Discover versatile styling techniques for your Ankara pieces beyond traditional looks.',
'From casual chic to formal elegance, learn how to wear Ankara in modern, sophisticated ways. These styling tips will help you get more wear out of your traditional pieces.',
'{"fashion", "ankara", "styling", "traditional"}',
'/images/5WaystoStyleYourAnkara.png', true),

('DIY Natural Face Masks', 'diy-natural-face-masks', 'Beauty',
'Create effective face masks using natural ingredients found in your kitchen.',
'Learn the science behind natural ingredients and how to customize masks for your skin type. These DIY treatments are cost-effective alternatives to expensive spa treatments.',
'{"beauty", "DIY", "face masks", "natural"}',
'/images/DIYNaturalFaceMasks.png', true);

-- =============================================
-- 3️⃣ POPULATE DIY TUTORIALS TABLE
-- =============================================

INSERT INTO diy_tutorials (title, slug, category, difficulty, steps, materials, estimated_time, cover_image, published) VALUES
('Handmade Beaded Necklace', 'handmade-beaded-necklace', 'Accessories', 'Beginner',
'[{"title": "Gather Materials", "description": "Collect all beads, string, and clasps", "image_url": "/images/EmmdraGallary2.JPG"}, {"title": "Design Pattern", "description": "Plan your bead pattern on a flat surface", "image_url": "/images/EmmdraGallary3.png"}, {"title": "String Beads", "description": "Thread beads onto string in your chosen pattern", "image_url": "/images/EmmdraGallary4.png"}, {"title": "Add Clasp", "description": "Secure ends with crimp beads and clasp", "image_url": "/images/EmmdraLogo.png"}]',
'{"assorted beads", "beading string", "crimp beads", "clasp", "scissors"}',
'45 minutes',
'/images/HandmadeBeadedNecklace.png', true),

('Natural Hair Treatment Mask', 'natural-hair-treatment-mask', 'Beauty', 'Beginner',
'[{"title": "Mix Ingredients", "description": "Combine honey, coconut oil, and essential oils", "image_url": "/images/beautyHub.png"}, {"title": "Apply to Hair", "description": "Section hair and apply mask evenly", "image_url": "/images/EmmdraFashionDesignAndAccessories.png"}, {"title": "Massage Scalp", "description": "Gently massage for 5 minutes", "image_url": "/images/EmmdraGallary2.JPG"}, {"title": "Rinse Thoroughly", "description": "Wash with lukewarm water and mild shampoo", "image_url": "/images/EmmdraGallary3.png"}]',
'{"honey", "coconut oil", "lavender oil", "shower cap"}',
'30 minutes',
'/images/NaturalHairTreatmentMask.png', true),

('DIY Ankara Throw Pillow', 'diy-ankara-throw-pillow', 'Home Decor', 'Intermediate',
'[{"title": "Cut Fabric", "description": "Cut Ankara fabric to pillow size with seam allowance", "image_url": "/images/EmmdraFashionDesignAndAccessories.png"}, {"title": "Sew Sides", "description": "Sew three sides together with right sides facing", "image_url": "/images/EmmdraGallary2.JPG"}, {"title": "Insert Filling", "description": "Turn right side out and stuff with filling", "image_url": "/images/EmmdraGallary3.png"}, {"title": "Close Opening", "description": "Hand stitch the opening closed", "image_url": "/images/EmmdraGallary4.png"}]',
'{"Ankara fabric", "sewing machine", "thread", "scissors", "fiber fill", "pins"}',
'2 hours',
'/images/DIYAnkaraThrowPillow.png', true),

('Handmade Scented Candles', 'handmade-scented-candles', 'Home Decor', 'Beginner',
'[{"title": "Prepare Wax", "description": "Melt soy wax in double boiler", "image_url": "/images/EmmdraGallary1.JPG"}, {"title": "Add Fragrance", "description": "Mix in essential oils for scent", "image_url": "/images/EmmdraGallary2.JPG"}, {"title": "Set Wick", "description": "Place wick in container and secure", "image_url": "/images/EmmdraGallary3.png"}, {"title": "Pour Wax", "description": "Pour wax mixture into container", "image_url": "/images/EmmdraGallary4.png"}]',
'{"soy wax", "essential oils", "wick", "container", "double boiler"}',
'1 hour',
'/images/HandmadeScentedCandles.png', true),

('Natural Body Scrub', 'natural-body-scrub', 'Beauty', 'Beginner',
'[{"title": "Mix Base", "description": "Combine sugar and carrier oil", "image_url": "/images/beautyHub.png"}, {"title": "Add Scent", "description": "Mix in essential oils and vitamin E", "image_url": "/images/EmmdraFashionDesignAndAccessories.png"}, {"title": "Store Properly", "description": "Transfer to airtight container", "image_url": "/images/EmmdraGallary2.JPG"}, {"title": "Apply to Skin", "description": "Use in shower for exfoliation", "image_url": "/images/EmmdraGallary3.png"}]',
'{"sugar", "coconut oil", "essential oils", "vitamin E", "container"}',
'20 minutes',
'/images/NaturalBodyScrub.png', true),

('DIY Ankara Tote Bag', 'diy-ankara-tote-bag', 'Accessories', 'Intermediate',
'[{"title": "Cut Fabric", "description": "Cut Ankara fabric pieces for bag", "image_url": "/images/EmmdraFashionDesignAndAccessories.png"}, {"title": "Sew Sides", "description": "Sew side seams and add gusset", "image_url": "/images/EmmdraGallary2.JPG"}, {"title": "Add Handles", "description": "Attach fabric handles securely", "image_url": "/images/EmmdraGallary3.png"}, {"title": "Finish Edges", "description": "Hem top edge and add lining", "image_url": "/images/EmmdraGallary4.png"}]',
'{"Ankara fabric", "sewing machine", "thread", "scissors", "pins"}',
'3 hours',
'/images/DIYAnkaraToteBag.png', true),

('Beaded Keychain', 'beaded-keychain', 'Accessories', 'Beginner',
'[{"title": "Select Beads", "description": "Choose beads for your design", "image_url": "/images/EmmdraGallary1.JPG"}, {"title": "String Beads", "description": "Thread beads onto keyring wire", "image_url": "/images/EmmdraGallary2.JPG"}, {"title": "Create Pattern", "description": "Arrange beads in desired pattern", "image_url": "/images/EmmdraGallary3.png"}, {"title": "Secure Ends", "description": "Crimp wire ends and add keyring", "image_url": "/images/EmmdraGallary4.png"}]',
'{"assorted beads", "wire", "crimp beads", "keyring", "pliers"}',
'30 minutes',
'/images/BeadedKeychain.png', true);

-- =============================================
-- 4️⃣ POPULATE WORKSHOPS TABLE
-- =============================================

INSERT INTO workshops (title, slug, description, category, price, schedule, max_participants, instructor, cover_image, status) VALUES
('Fashion Styling Masterclass', 'fashion-styling-masterclass', 'Learn professional styling techniques and build your signature look', 'Fashion', 25000.00,
'{"date": "2024-02-15", "time": "10:00 AM", "duration": "3 hours", "location": "Emmdra Studio, Enugu"}',
20, 'Emmanuel Chuka', '/images/EmmdraFashionDesignAndAccessories.png', 'upcoming'),

('DIY Jewelry Making Workshop', 'diy-jewelry-making', 'Create beautiful handmade jewelry while learning essential crafting skills', 'Crafts', 15000.00,
'{"date": "2024-02-22", "time": "2:00 PM", "duration": "4 hours", "location": "Emmdra Workshop Space"}',
15, 'Chidera Lois', '/images/DIYJewelryMakingWorkshop.png', 'upcoming'),

('Natural Beauty Workshop', 'natural-beauty-workshop', 'Discover the secrets of natural beauty and create your own products', 'Beauty', 18000.00,
'{"date": "2024-03-01", "time": "11:00 AM", "duration": "2.5 hours", "location": "Emmdra Beauty Hub"}',
12, 'Amara Nwosu', '/images/NaturalBeautyWorkshop.png', 'upcoming'),

('Natural Skincare DIY Workshop', 'natural-skincare-diy-workshop', 'Learn to create natural skincare products using organic ingredients', 'Beauty', 22000.00,
'{"date": "2024-03-08", "time": "10:00 AM", "duration": "3 hours", "location": "Emmdra Beauty Hub"}',
10, 'Amara Nwosu', '/images/NaturalSkincareDIYWorkshop.png', 'upcoming'),

('Eco-Friendly Accessories Workshop', 'eco-friendly-accessories-workshop', 'Create sustainable fashion accessories using recycled materials', 'Fashion', 12000.00,
'{"date": "2024-03-15", "time": "1:00 PM", "duration": "2 hours", "location": "Emmdra Studio, Enugu"}',
18, 'Emmanuel Chuka', '/images/EcoFriendlyAccessoriesWorkshop.png', 'upcoming'),

('Kids Craft Fun Workshop', 'kids-craft-fun-workshop', 'Fun and educational craft activities designed for children aged 6-12', 'Kids', 8000.00,
'{"date": "2024-03-22", "time": "9:00 AM", "duration": "2 hours", "location": "Emmdra Workshop Space"}',
25, 'Chidera Lois', '/images/KidsCraftFunWorkshop.png', 'upcoming'),

('Home Décor DIY Workshop', 'home-decor-diy-workshop', 'Transform your living space with creative DIY home decoration projects', 'Home', 20000.00,
'{"date": "2024-03-29", "time": "11:00 AM", "duration": "4 hours", "location": "Emmdra Workshop Space"}',
15, 'Amara Nwosu', '/images/HomeDecorDIYWorkshop.png', 'upcoming');

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
-- ✅ 20 Products (fashion, beauty, accessories)
-- ✅ 10 Blog Posts (fashion, beauty, lifestyle, DIY)
-- ✅ 7 DIY Tutorials (jewelry, beauty, home decor)
-- ✅ 7 Workshops (fashion, crafts, beauty)
-- ✅ Performance indexes for fast queries
-- ✅ Ready for production!

-- Next steps:
-- 1. Run: npx ts-node verify-database.ts
-- 2. Test your application locally
-- 3. Verify all pages load with content
-- 4. Test contact form functionality
