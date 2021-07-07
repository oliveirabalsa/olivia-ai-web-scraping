import ICredentials from "../dto/ICredentials";

export default interface IExtractCredentialsUseCase {
  execute(html: string): Promise<ICredentials>;
}
