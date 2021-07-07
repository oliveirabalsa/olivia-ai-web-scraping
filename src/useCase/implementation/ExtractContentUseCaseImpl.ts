import IExtractContentUseCase from "../interface/IExtractContentUseCase";
import extractPropsHelper from "../../web/helper/ExtractPropsHelper";
import extractFinancialDetailsHelper from "../../web/helper/ExtractFinancialDetailsHelper";
import { Financials } from "../../domain/financials/Financials";
import { http } from "../../infra/integration/axios/config";

export default class ExtractContentUseCaseImpl
  implements IExtractContentUseCase
{
  async execute(pageContent: string, pageCookies: string): Promise<any> {
    const financeDetails = await extractFinancialDetailsHelper.execute(
      pageContent
    );

    const { path, method, type, apiKeyProp, apiKeyValue } =
      await extractPropsHelper.execute(pageContent);

    const content = await http.get(path, {
      headers: {
        [apiKeyProp]: apiKeyValue,
        Cookie: `connect.sid=${pageCookies}`,
      },
    });

    const financial = content.data;

    return {
      data: financeDetails,
      ...financial,
    };
  }
}
