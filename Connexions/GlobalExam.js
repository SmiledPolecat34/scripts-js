require('dotenv').config();
const puppeteer = require('puppeteer');

const username = process.env.UTILISATEUR;
const password = process.env.MDP;
const login = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('https://auth.global-exam.com/login', { waitUntil: 'domcontentloaded' });

  await page.type('input[type="email"]', username);
  await page.type('input[type="password"]', password);

  // Attendre un peu avant de cliquer pour s'assurer que le bouton est bien visible
  await page.waitForTimeout(3000);

  // Utilisation d'une classe pour cibler le bouton
await page.click('.button-solid-primary-big');

// Ou, si possible, en utilisant l'élément 'button' directement
// await page.click('button[type="submit"]');


  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

  const content = await page.content();
  console.log(content);

  // Ne pas fermer le navigateur Puppeteer pour garder la page ouverte
};

login();
