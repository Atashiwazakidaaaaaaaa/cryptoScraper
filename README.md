# 🪙 Serverless Crypto Scraper

A high-performance, serverless cryptocurrency price tracker built with **Node.js**, **Playwright**, and **Vercel**. It automatically scrapes market data, stores it in **Supabase**, and sends real-time alerts to **Discord**.

## 🚀 Features
- **Automated Scraping**: Daily cron jobs via Vercel.
- **Dynamic Content Handling**: Uses Playwright to handle modern, JavaScript-heavy sites.
- **Historical Tracking**: PostgreSQL database via Supabase.
- **Push Notifications**: Beautiful Discord embed alerts.
- **TypeScript**: Fully typed for reliability.

## 🛠 Tech Stack
- **Runtime**: Node.js 20+ (TypeScript)
- **Engine**: Playwright + @sparticuz/chromium
- **Cloud**: Vercel Serverless Functions
- **Database**: Supabase (PostgreSQL)
- **Alerts**: Discord Webhooks

## 📦 Setup & Deployment

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

---
Built with ❤️ by [Your Name]
