import IGetInitialPageUseCase from "../interface/IGetInitialPageUseCase";
import { http } from "../../infra/integration/axios/config";

export default class GetInitalPageUseCaseImpl
  implements IGetInitialPageUseCase
{
  async execute(): Promise<string> {
    console.log("Searching content...");
    const initialPage = await http.get("/login");
    console.log("Finish");
    return initialPage.data;
  }
}
