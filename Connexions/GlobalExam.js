require('dotenv').config();
const puppeteer = require('puppeteer');

//
class GlobalExam {
  async login() {
    const username = process.env.UTILISATEUR;
    const password = process.env.MDP;

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://auth.global-exam.com/login', { waitUntil: 'domcontentloaded' });

    await page.type('input[type="email"]', username);
    await page.type('input[type="password"]', password);

    await page.waitForTimeout(3000);

    await page.click('.button-solid-primary-big');

    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

    const content = await page.content();
    console.log(content);

    // const page2 = await browser.newPage();

    // await page2.goto('https://chat.openai.com/?__cf_chl_tk=RRjO1wmsCtl0y4wtsBQfIx0H1jQXXyzvx.G8C.xPGOU-1679313239-0-gaNycGzNFlA', { waitUntil: 'domcontentloaded' });

    // // await page2.type('input[type="email"]', username);
    // // await page2.type('input[type="password"]', password);

    // await page2.waitForTimeout(3000);

    // await page2.click('.button-solid-primary-big');

    // await page2.waitForNavigation({ waitUntil: 'domcontentloaded' });

    // const content2 = await page2.content();
    // console.log(content2);

    // // Ne ferme pas le navigateur pour garder la page ouverte après la connexion
    // // browser.close();
  }
}

const exam = new GlobalExam();
exam.login();
