import ICredentials from "../dto/ICredentials";
import IExtractCredentialsUseCase from "../interface/IExtractCredentialsUseCase";
import cheerio from "cheerio";
import writeFile from "../../web/helper/WriteToFileHelper";
import getCached from "../../web/helper/GetCachedPageHelper";

export default class ExtractCredentialsUseCaseImpl
  implements IExtractCredentialsUseCase
{
  async execute(html: string): Promise<ICredentials> {
    const cachedCredentials = await getCached.execute("credentials", "json");
    (cachedCredentials);
    if (cachedCredentials) {
      return JSON.parse(cachedCredentials);
    }
    const $ = cheerio.load(html);
    const [credentials] = $("div > div")
      .toArray()
      .map((item) => $(item).text());

    const [user, password] = credentials
      .split("'")
      .filter((str) => str && !str.includes(":"));

    const userCredentials = { user, password };

    writeFile.execute(JSON.stringify(userCredentials), "credentials", "json");

    return userCredentials;
  }
}
