import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import puppeteer, { Browser, Page } from 'puppeteer';

// 1) Recréer __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2) Déterminer le chemin du .env à charger
const envPath = process.env.ENV
  ? path.resolve(process.env.ENV)
  : path.resolve(__dirname, '../../../.env.local');

console.log('⏳ Chargement des variables depuis', envPath);
dotenv.config({ path: envPath });

export class GlobalExam {
  public async login(): Promise<void> {
    const username: string | undefined = process.env.UTILISATEUR_GLOBAL_EXAM;
    const password: string | undefined = process.env.MDP_GLOBAL_EXAM;

    console.log("Username:", username);
    console.log("Password:", password);

    if (!username || !password) {
      console.error("❌ Les variables d'environnement ne sont pas définies !");
      return;
    }

    const browser: Browser = await puppeteer.launch({ headless: false });
    const page: Page = await browser.newPage();

    await page.goto('https://auth.global-exam.com/login', { waitUntil: 'domcontentloaded' });

    await page.type('input[type="email"]', username);
    await page.type('input[type="password"]', password);

    await page.waitForSelector('button[form="loginForm"]', { timeout: 5000 });
    await page.click('button[form="loginForm"]');

    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

    const content: string = await page.content();
    console.log(content);
  }
}

// Si tu veux pouvoir lancer ce fichier directement avec ts-node/esm
(async () => {
  await new GlobalExam().login();
  console.log("Login process completed.");
})();
