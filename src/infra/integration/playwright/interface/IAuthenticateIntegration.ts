import ICredentials from "../../../../useCase/dto/ICredentials";

export default interface IAuthenticateIntegration {
  execute(credentials: ICredentials): Promise<string>;
}
