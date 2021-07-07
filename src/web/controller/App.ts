import GetInitalPageUseCaseImpl from "../../usecase/implementation/GetInitalPageUseCaseImpl";
import ExtractCredentialsUseCaseImpl from "../../usecase/implementation/ExtractCredentialsUseCaseImpl";
import MakeLoginUseCaseImpl from "../../usecase/implementation/MakeLoginUseCaseImpl";
import { Request, Response } from "express";
import ExtractContentUseCaseImpl from "../../usecase/implementation/ExtractContentUseCaseImpl";

class App {
  public async init(request: Request, response: Response): Promise<Response> {
    const getInitialPageUseCase = new GetInitalPageUseCaseImpl();
    const extractCredentialsUseCase = new ExtractCredentialsUseCaseImpl();
    const makeLoginUseCase = new MakeLoginUseCaseImpl();
    const extractContentUseCase = new ExtractContentUseCaseImpl();

    try {
      const initialPage = await getInitialPageUseCase.execute();

      const credentials = await extractCredentialsUseCase.execute(initialPage);

      const { pageContent, pageCookies } = await makeLoginUseCase.execute(
        credentials
      );

      const content = await extractContentUseCase.execute(
        pageContent,
        pageCookies
      );
      
      return response.status(200).json(content);
    } catch (e) {
      return response.status(500).json({ message: "Internal Server Erroru" });
    }
  }
}

export default new App();
