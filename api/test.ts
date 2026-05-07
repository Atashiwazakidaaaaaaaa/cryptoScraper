import { VercelRequest, VercelResponse } from '@vercel/node';
import { scrapeCryptoData } from '../lib/scraper';
import { sendDiscordNotification } from '../lib/notifier';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log('Public Test: Starting scrape...');
    const data = await scrapeCryptoData();
    
    console.log('Public Test: Sending Discord notification...');
    await sendDiscordNotification(data);

    return res.status(200).json({ 
      success: true, 
      message: "Public test successful! Check your Discord channel.",
      scraped_at: new Date().toISOString(),
      data 
    });
  } catch (error: any) {
    console.error('Public Test Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
