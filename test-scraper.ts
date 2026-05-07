import dotenv from 'dotenv';
dotenv.config();

import { scrapeCryptoData } from './lib/scraper';
import { sendDiscordNotification } from './lib/notifier';

async function test() {
  console.log('--- Local Scraper Test ---');
  try {
    const data = await scrapeCryptoData();
    console.log('Scraped Data:', data);
    
    // Optionally test notification if webhook is provided
    if (process.env.DISCORD_WEBHOOK_URL) {
      console.log('Sending notification...');
      await sendDiscordNotification(data);
    } else {
      console.log('DISCORD_WEBHOOK_URL not set, skipping notification test.');
    }
  } catch (error) {
    console.error('Test failed:', error);
  }
}

test();
