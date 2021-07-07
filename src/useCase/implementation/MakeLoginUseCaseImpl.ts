import AuthenticateIntegrationImpl from "../../infra/integration/playwright/implementation/AuthenticationIntegrationImpl";
import IPage from "../../infra/integration/playwright/interface/IPage";
import ICredentials from "../dto/ICredentials";
import IMakeLoginUseCase from "../interface/IMakeLoginUseCase";

export default class MakeLoginUseCaseImpl implements IMakeLoginUseCase {
  async execute(credentials: ICredentials): Promise<IPage> {
    const authenticateIntegration = new AuthenticateIntegrationImpl();
    const pageData = await authenticateIntegration.execute(
      credentials
    );

    return pageData
  }
}
