import axios from 'axios';
import { CryptoData } from './scraper';

export async function sendDiscordNotification(data: CryptoData[]) {
  const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || '';

  if (!DISCORD_WEBHOOK_URL) {
    console.warn('DISCORD_WEBHOOK_URL is not set. Skipping notification.');
    return;
  }

  const fields = data.map(coin => ({
    name: `${coin.name} (${coin.symbol})`,
    value: `Price: **$${coin.price.toLocaleString()}**\nMarket Cap: $${coin.marketCap?.toLocaleString()}\nVol 24h: $${coin.volume24h?.toLocaleString()}`,
    inline: true,
  }));

  const embed = {
    title: '🚀 Crypto Price Update',
    description: `Latest prices scraped at ${new Date().toLocaleString()}`,
    color: 0x00ff00, // Green
    fields: fields,
    footer: {
      text: 'Serverless Crypto Scraper',
    },
  };

  try {
    await axios.post(DISCORD_WEBHOOK_URL, {
      embeds: [embed],
    });
    console.log('Discord notification sent successfully.');
  } catch (error) {
    console.error('Error sending Discord notification:', error);
  }
}
