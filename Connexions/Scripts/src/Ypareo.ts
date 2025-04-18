import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import puppeteer, { Browser, Page, ElementHandle } from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = process.env.ENV
    ? path.resolve(process.env.ENV)
    : path.resolve(__dirname, '../../../.env.local');

console.log('⏳ Chargement des variables depuis', envPath);
dotenv.config({ path: envPath });

dotenv.config({
    path: process.env.ENV
});

export class Ypareo {
    public async login(): Promise<void> {
        const username = process.env.UTILISATEUR_YPAREO;
        const password = process.env.MDP_YPAREO;

        console.log("Username:", username);
        console.log("Password:", password);

        if (!username || !password) {
            console.error('❌ UTILISATEUR_YPAREO ou MDP_YPAREO non définis.');
            return;
        }

        let browser: Browser | null = null;

        try {
            browser = await puppeteer.launch({ headless: false });
            const page: Page = await browser.newPage();
            try {
                await page.goto(
                    'https://ecole-ipssi.ymag.cloud/index.php/login/',
                    { waitUntil: 'domcontentloaded' }
                );
            } catch (err) {
                console.error('❌ Erreur de navigation :', err);
                await browser.close();
                return;
            }
            await page.type('input[type="text"]', username);
            await page.type('input[type="password"]', password);
            await page.waitForTimeout(3000);
            await page.click('.btn.btn-primary');
            await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
            await page.waitForTimeout(5000);
            await page.waitForSelector('.btn.btn-primary.btn-submit.js-btn-signer', { visible: true });
            try {
                await page.click('.btn.btn-primary.btn-submit.js-btn-signer');
            } catch (err) {
                console.error('⚠️ Clic standard échoué, fallback JS :', err);
                await page.evaluate(() => {
                    const btn = document.querySelector<HTMLSpanElement>('.btn.btn-primary.btn-submit.js-btn-signer');
                    btn?.click();
                });
            }
            const rawHandles = await page.$x("//span[contains(text(), 'Signer')]");
            const handles: ElementHandle<Element>[] = rawHandles
                .map(h => h.asElement())
                .filter((el): el is ElementHandle<Element> => el !== null);

            if (handles.length) {
                await handles[0].click();
            } else {
                console.warn("Le bouton 'Signer' n'a pas été trouvé.");
            }

            await page.waitForTimeout(3000);
            console.log(await page.content());

        } catch (error) {
            console.error('❌ Erreur dans Ypareo.login():', error);
        } finally {
            if (browser) await browser.close();
        }
    }
}
(async () => {
    await new Ypareo().login();
})();
