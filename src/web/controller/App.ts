import GetInitalPageUseCaseImpl from "../../useCase/implementation/GetInitalPageUseCaseImpl";
import ExtractCredentialsUseCaseImpl from "../../useCase/implementation/ExtractCredentialsUseCaseImpl";
import MakeLoginUseCaseImpl from "../../useCase/implementation/MakeLoginUseCaseImpl";
import { Request, Response } from "express";
// import IGetInitialPageUseCase from "../../useCase/interface/IGetInitialPageUseCase";

class App {
  public async init(request: Request, response: Response): Promise<Response> {
    const getInitialPageUseCase = new GetInitalPageUseCaseImpl();
    const extractCredentialsUseCase = new ExtractCredentialsUseCaseImpl();
    const makeLoginUseCase = new MakeLoginUseCaseImpl();

    // TO DO create a cache funtion with FileSystem
    const initialPage = await getInitialPageUseCase.execute();
    // const initialPage =
    //   '<h1>Web Scraping Exam</h1>\n<form action="/login" method="post">\n\t<div>\n\t<label>Username:</label>\n\t<input type="text" name="username"/><br/>\n\t</div>\n\t<div>\n\t<label>Password:</label>\n\t<input type="password" name="password"/>\n\t</div>\n\t<div>\n\t<input type="submit" value="Submit"/>\n\t</div>\n</form>\n<h2>\n\tValid credentials:\n</h2>\n<div>\n\t<div>user: \'olivia\', password: \'oliveira\'</div>\n\t<div>user: \'oliver\', password: \'olivia\'</div>\n</div>';

    // TO DO create a cache funtion with FileSystem
    const credentials = extractCredentialsUseCase.execute(initialPage);
    // const credentials = { user: "olivia", password: "oliveira" };

    // TO DO create a cache funtion with FileSystem
    const finalPage = await makeLoginUseCase.execute(credentials);

    // TO DO create an useCase to get content and return an Financial interface
    ///////////////

    return response.status(200).json(finalPage);
  }
}

export default new App();
