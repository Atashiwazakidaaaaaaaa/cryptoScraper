
1. **Clone the repo**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/cryptoScraper.git
   cd cryptoScraper
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Database Setup**:
   Run the SQL in `schema.sql` in your Supabase SQL Editor.

4. **Environment Variables**:
   Create a `.env` file with:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `DISCORD_WEBHOOK_URL`
   - `CRON_SECRET`

5. **Deploy**:
   ```bash
   vercel --prod
   ```

## 📈 Local Testing
Run the scraper once locally:
```bash
npm run scrape:local
```
