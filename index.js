(async () => {
    const puppeteer = require('puppeteer');

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const html = '<html><body><h1>Hello world</h1></body></html>';
    await page.setContent(html);
    await page.screenshot({ path: 'output.jpg', type: 'jpeg', quality: 90 });
    browser.close();
})();
