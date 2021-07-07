import IPage from "../../infra/integration/playwright/interface/IPage";
import ICredentials from "../dto/ICredentials";

export default interface IMakeLoginUseCase {
  execute(credentials: ICredentials): Promise<IPage>;
}
