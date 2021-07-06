import ICredentials from "../../../../useCase/dto/ICredentials";
import { LoginError } from "../../../../web/handler/LoginError";
const { chromium } = require("playwright");
import IAuthenticateIntegration from "../interface/IAuthenticateIntegration";

export default class AuthenticateIntegrationImpl
  implements IAuthenticateIntegration
{
  async execute(credentials: ICredentials): Promise<string> {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto("https://fit-web-scraping-challenge.herokuapp.com/login");
    await page.fill('input[name="username"]', credentials.user);
    await page.fill('input[name="password"]', credentials.password);
    await page.click("text=Submit");
    const loginSucceded = await page.innerHTML("a");

    if (loginSucceded !== "Alphabet") {
      throw new LoginError("Login error!");
    }

    await page.click(`a:has-text("${loginSucceded}")`);
    const pageUrl = page.url();
    await browser.close();
    return pageUrl;
  }
}
