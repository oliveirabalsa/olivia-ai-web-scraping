import AuthenticateIntegrationImpl from "../../infra/integration/playwright/implementation/AuthenticationIntegrationImpl";
import ICredentials from "../dto/ICredentials";

export default class MakeLoginUseCaseImpl {
  async execute(credentials: ICredentials) {
    const authenticateIntegration = new AuthenticateIntegrationImpl();
    return await authenticateIntegration.execute(credentials);
  }
}
