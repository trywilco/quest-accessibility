/* eslint-disable */
const puppeteer = require("puppeteer");

function rgbToHex(rgb) {
  const rgbValues = rgb.match(/\d+/g);
  const hexValues = rgbValues.map(value => parseInt(value).toString(16).padStart(2, '0'));
  return `#${hexValues.join('')}`;
}

describe("Check the global items feed button has the right color", () => {
  let browser, page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await page.close();
    await browser.close();
  });

  it("Global feed button color is white", async () => {
    await page.goto("http://localhost:3001", {
      waitUntil: "load",
      timeout: 60000,
    });
    page.on("console", (log) => console.log(log.text()));

    await page.waitForSelector(`button.nav-link`, {
      timeout: 5000,
    });
    const globalItemsButton = await page.$("button.nav-link");
    const rgbColor = await globalItemsButton.evaluate((el) => {
      el.classList.add("active");
      const style = getComputedStyle(el);
      return style.color;
    });
    const hexColor = rgbToHex(rgbColor);

    await expect(hexColor).toBe("#ffffff");
  }, 60000)
});
