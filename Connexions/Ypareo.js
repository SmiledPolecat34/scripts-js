require('dotenv').config();
const puppeteer = require('puppeteer');

class Ypareo {
  async login() {
    const username = process.env.UTILISATEUR_YPAREO;
    const password = process.env.MDP_YPAREO;

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // await page.goto('https://ecole-ipssi.ymag.cloud/index.php/login/', { waitUntil: 'domcontentloaded' });

    try {
      await page.goto('https://ecole-ipssi.ymag.cloud/index.php/login/', { waitUntil: 'domcontentloaded' });
  } catch (error) {
      console.error("Error navigating to page:", error);
      await browser.close();
      return;
  }

    await page.type('input[type="text"]', username);
    await page.type('input[type="password"]', password);

    await page.waitForTimeout(3000);

    await page.click('.btn.btn-primary');

    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

    await page.waitForTimeout(5000);

    // Attendre que le bouton soit visible et interactif
    await page.waitForSelector('.btn.btn-primary.btn-submit.js-btn-signer', { visible: true });

    try {
      // Tenter de cliquer sur le bouton avec la méthode standard
      await page.click('.btn.btn-primary.btn-submit.js-btn-signer');
    } catch (error) {
      console.error("Erreur lors du clic standard, tentative de clic via JavaScript", error);
      // Si le clic standard échoue, utiliser JavaScript pour forcer le clic
      await page.evaluate(() => {
        document.querySelector('.btn.btn-primary.btn-submit.js-btn-signer').click();
      });
    }

    // Solution de secours utilisant XPath si nécessaire
    const buttons = await page.$x("//span[contains(text(), 'Signer')]");
    if (buttons.length > 0) {
      await buttons[0].click();
    } else {
      console.log("Le bouton 'Signer' n'a pas été trouvé via XPath.");
    }

    await page.waitForTimeout(3000);

    const content = await page.content();
    console.log(content);
  }
}

const session = new Ypareo();
session.login();

{/* <span class="btn btn-primary btn-submit js-enregistrer-signature">Enregistrer</span> */}