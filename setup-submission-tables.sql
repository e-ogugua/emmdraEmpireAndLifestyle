-- Create tables for storing form submissions

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    product_name TEXT NOT NULL,
    product_id TEXT,
    quantity TEXT NOT NULL,
    budget TEXT,
    size TEXT,
    color TEXT,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consultations table
CREATE TABLE IF NOT EXISTS consultations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    consultation_type TEXT NOT NULL,
    budget TEXT,
    preferred_date DATE,
    preferred_time TEXT,
    current_style TEXT,
    goals TEXT,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Training requests table
CREATE TABLE IF NOT EXISTS training_requests (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    training_type TEXT NOT NULL,
    experience_level TEXT,
    availability TEXT,
    goals TEXT,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON consultations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_training_requests_created_at ON training_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated admin users to read all records
CREATE POLICY "Allow admin read access on orders" ON orders
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.email IN (
                SELECT value FROM jsonb_array_elements_text(
                    COALESCE(current_setting('app.admin_emails', true), '[]')
                )
            )
        )
    );

CREATE POLICY "Allow admin read access on consultations" ON consultations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.email IN (
                SELECT value FROM jsonb_array_elements_text(
                    COALESCE(current_setting('app.admin_emails', true), '[]')
                )
            )
        )
    );

CREATE POLICY "Allow admin read access on training_requests" ON training_requests
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.email IN (
                SELECT value FROM jsonb_array_elements_text(
                    COALESCE(current_setting('app.admin_emails', true), '[]')
                )
            )
        )
    );

CREATE POLICY "Allow admin read access on contact_messages" ON contact_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.email IN (
                SELECT value FROM jsonb_array_elements_text(
                    COALESCE(current_setting('app.admin_emails', true), '[]')
                )
            )
        )
    );
