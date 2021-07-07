import ICredentials from "../../../../useCase/dto/ICredentials";
import IPage from "./IPage";

export default interface IAuthenticateIntegration {
  execute(credentials: ICredentials): Promise<IPage>;
}
