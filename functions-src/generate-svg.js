const chromium = require('chrome-aws-lambda');

/**
 * @return Promise<Buffer>
 */
async function generateSvg() {
  const browser = await chromium.puppeteer.launch({ 
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
  });
  const page = await browser.newPage();
  const html = '<html><body><h1>Hello world</h1></body></html>';
  await page.setContent(html);
  // const screenshot = page.screenshot({ path: 'output.jpg', type: 'jpeg', quality: 90 });
  browser.close();
  return '';
  // return screenshot;
}

exports.handler = async (event, context) => {
  try {
    const { category, title, type, playset } = event.queryStringParameters;
    if (!category || !title || !type || !playset ) {
      return {
        statusCode: 400,
        body: 'Missing parameter (category, title, type, playset)',
      };
    }
    const img = await generateSvg({ category, title, type, playset });
    return {
      statusCode: 200,
      body: img,
      headers: { "Content-Type": "image/jpeg" },
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() + '<br>' + err.stack }
  }
}
