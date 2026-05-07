import { chromium as playwright } from 'playwright-core';
import chromium from '@sparticuz/chromium';

export interface CryptoData {
  name: string;
  symbol: string;
  price: number;
  marketCap?: number;
  volume24h?: number;
}

export async function scrapeCryptoData(): Promise<CryptoData[]> {
  const isLocal = process.env.NODE_ENV === 'development' || !process.env.VERCEL;
  
  let browser;
  
  try {
    browser = await playwright.launch({
      args: isLocal ? [] : chromium.args,
      executablePath: isLocal 
        ? undefined // Playwright will find local browser
        : await chromium.executablePath(),
      headless: true,
    });

    const page = await browser.newPage();
    
    // Navigate to CoinMarketCap (or any other site)
    // Using a simpler site or a specific selector for demonstration
    await page.goto('https://coinmarketcap.com/', { waitUntil: 'networkidle' });

    // Wait for the table to load
    await page.waitForSelector('table.cmc-table');

    // Extract data for the top 5 coins
    const coins = await page.evaluate(`
      (() => {
        const rows = Array.from(document.querySelectorAll('table.cmc-table tbody tr')).slice(0, 5);
        return rows.map(row => {
          const nameEl = row.querySelector('.coin-item-name, .cmc-table__column-name--name, p[font-weight="semibold"]');
          const symbolEl = row.querySelector('.coin-item-symbol, .cmc-table__column-name--symbol, p[color="text3"]');
          const priceEl = row.querySelector('td:nth-child(4) span, .cmc-table__cell--sort-by__price');
          const marketCapEl = row.querySelector('td:nth-child(8) span, .cmc-table__cell--sort-by__market-cap');
          const volumeEl = row.querySelector('td:nth-child(9) p, .cmc-table__cell--sort-by__volume-24h');

          const name = nameEl ? nameEl.textContent.trim() : '';
          const symbol = symbolEl ? symbolEl.textContent.trim() : '';
          const priceText = priceEl ? priceEl.textContent : '0';
          const marketCapText = marketCapEl ? marketCapEl.textContent : '0';
          const volumeText = volumeEl ? volumeEl.textContent : '0';

          const parseNum = (text) => {
            const num = parseFloat(text.replace(/[^0-9.]/g, ''));
            return isNaN(num) ? 0 : num;
          };

          return { 
            name, 
            symbol, 
            price: parseNum(priceText), 
            marketCap: parseNum(marketCapText), 
            volume24h: parseNum(volumeText) 
          };
        });
      })()
    `) as CryptoData[];

    return coins;
  } catch (error) {
    console.error('Error during scraping:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
