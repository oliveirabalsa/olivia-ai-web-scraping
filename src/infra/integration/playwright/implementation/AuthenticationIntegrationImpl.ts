import ICredentials from "../../../../useCase/dto/ICredentials";
import { LoginError } from "../../../../web/handler/LoginError";
const { chromium } = require("playwright");
import IAuthenticateIntegration from "../interface/IAuthenticateIntegration";
import IPage from "../interface/IPage";

export default class AuthenticateIntegrationImpl
  implements IAuthenticateIntegration
{
  async execute(credentials: ICredentials): Promise<IPage> {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://fit-web-scraping-challenge.herokuapp.com/login");

    await page.fill('input[name="username"]', credentials.user);
    await page.fill('input[name="password"]', credentials.password);
    await page.click("text=Submit");

    const loginSucceded = await page.innerHTML("a");
    if (loginSucceded !== "Alphabet") {
      throw new LoginError("Login error!");
    }

    await page.click(`a:has-text("${loginSucceded}")`);

    const pageUrl = await page.url();

    await page.goto(pageUrl, { waitUntil: "networkidle" });

    const pageContent = await page.content();
    const pageCookies = await context.cookies();

    await browser.close();

    return { pageContent, pageCookies: pageCookies[0].value };
  }
}
