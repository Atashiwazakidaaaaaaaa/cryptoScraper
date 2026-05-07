-- Create a table for cryptocurrency prices
CREATE TABLE crypto_prices (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    symbol TEXT NOT NULL,
    price_usd NUMERIC(20, 8) NOT NULL,
    market_cap_usd NUMERIC(30, 2),
    volume_24h_usd NUMERIC(30, 2),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (RLS)
ALTER TABLE crypto_prices ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to read (if needed)
CREATE POLICY "Allow public read access" ON crypto_prices
    FOR SELECT USING (true);

-- Allow anonymous users to insert (service role or public if configured)
-- In a real app, you'd use a service role key from the serverless function
CREATE POLICY "Allow service role insert" ON crypto_prices
    FOR INSERT WITH CHECK (true);
