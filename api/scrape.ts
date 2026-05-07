import { VercelRequest, VercelResponse } from '@vercel/node';
import { scrapeCryptoData } from '../lib/scraper';
import { supabase } from '../lib/supabase';
import { sendDiscordNotification } from '../lib/notifier';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Optional: Verify CRON_SECRET to ensure only Vercel Crons can call this
  const authHeader = req.headers.authorization;
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('Starting scrape...');
    const data = await scrapeCryptoData();
    console.log(`Scraped ${data.length} coins.`);

    // 1. Store in Supabase
    const { error } = await supabase
      .from('crypto_prices')
      .insert(data.map(coin => ({
        name: coin.name,
        symbol: coin.symbol,
        price_usd: coin.price,
        market_cap_usd: coin.marketCap,
        volume_24h_usd: coin.volume24h,
      })));

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // 2. Send Discord Notification
    await sendDiscordNotification(data);

    return res.status(200).json({ 
      success: true, 
      message: `Successfully scraped and notified ${data.length} coins.`,
      data 
    });
  } catch (error: any) {
    console.error('Handler error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
