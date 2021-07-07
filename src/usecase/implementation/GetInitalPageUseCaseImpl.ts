import IGetInitialPageUseCase from "../interface/IGetInitialPageUseCase";
import { http } from "../../infra/integration/axios/config";
import writeFile from "../../web/helper/WriteToFileHelper";
import getCached from "../../web/helper/GetCachedPageHelper";

export default class GetInitalPageUseCaseImpl
  implements IGetInitialPageUseCase
{
  async execute(): Promise<string> {
    ("Searching content...");
    const cachedPage = await getCached.execute("initial-page");
    ("credentials cache found");
    (cachedPage);

    if (cachedPage) {
      return cachedPage;
    }
    const initialPage = await http.get("/login");
    const { data } = initialPage;
    writeFile.execute(data, "initial-page");
    return data;
  }
}
