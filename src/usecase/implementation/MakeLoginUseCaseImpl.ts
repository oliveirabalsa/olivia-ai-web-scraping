import AuthenticateIntegrationImpl from "../../infra/integration/playwright/implementation/AuthenticationIntegrationImpl";
import IPage from "../../infra/integration/playwright/interface/IPage";
import ICredentials from "../dto/ICredentials";
import IMakeLoginUseCase from "../interface/IMakeLoginUseCase";
import writeFile from "../../web/helper/WriteToFileHelper";
import getCached from "../../web/helper/GetCachedPageHelper";

export default class MakeLoginUseCaseImpl implements IMakeLoginUseCase {
  async execute(credentials: ICredentials): Promise<IPage> {
    const cachedPageData = await getCached.execute("page-data", "json");
    if (cachedPageData) {
      return JSON.parse(cachedPageData);
    }

    const authenticateIntegration = new AuthenticateIntegrationImpl();
    const pageData = await authenticateIntegration.execute(credentials);

    writeFile.execute(JSON.stringify(pageData), "page-data", "json");

    return pageData;
  }
}
