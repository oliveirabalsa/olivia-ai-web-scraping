import ICredentials from "../dto/ICredentials";
import IExtractCredentialsUseCase from "../interface/IExtractCredentialsUseCase";
import cheerio from "cheerio";

export default class ExtractCredentialsUseCaseImpl
  implements IExtractCredentialsUseCase
{
  execute(html: string): ICredentials {
    const $ = cheerio.load(html);
    const [credentials] = $("div > div")
      .toArray()
      .map((item) => $(item).text());

    const [user, password] = credentials
      .split("'")
      .filter((str) => str && !str.includes(":"));

    return { user, password };
  }
}
