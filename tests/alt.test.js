/* eslint-disable */
const puppeteer = require("puppeteer");

describe("Accessibility check for the banner", () => {
  let browser, page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await page.close();
    await browser.close();
  });

  it("Banner has defined alt attribute", async () => {
    await page.goto("http://localhost:3001", {
      waitUntil: "load",
      timeout: 60000,
    });
    page.on("console", (log) => console.log(log.text()));

    await page.waitForSelector(".banner img", {
      timeout: 5000,
    });
    const banner = await page.$(".banner img");
    const altAttribute = await banner.evaluate((el) => el.getAttribute("alt"));

    await expect(altAttribute?.toLowerCase()).toBe("anythink logo");
  }, 60000)
});
