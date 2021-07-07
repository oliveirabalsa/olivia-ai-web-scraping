import ICredentials from "../../../../usecase/dto/ICredentials";
import IPage from "./IPage";

export default interface IAuthenticateIntegration {
  execute(credentials: ICredentials): Promise<IPage>;
}
