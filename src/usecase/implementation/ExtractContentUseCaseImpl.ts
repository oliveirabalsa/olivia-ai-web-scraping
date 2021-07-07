import IExtractContentUseCase from "../interface/IExtractContentUseCase";
import extractPropsHelper from "../../web/helper/ExtractPropsHelper";
import extractFinancialDetailsHelper from "../../web/helper/ExtractFinancialDetailsHelper";
import writeFile from "../../web/helper/WriteToFileHelper";
import getCached from "../../web/helper/GetCachedPageHelper";
import { http } from "../../infra/integration/axios/config";
import { Financials } from "../../domain/financials/Financials";

export default class ExtractContentUseCaseImpl
  implements IExtractContentUseCase
{
  async execute(pageContent: string, pageCookies: string): Promise<Financials> {
    const finalCachedContent = await getCached.execute(
      "final-cached-content",
      "json"
    );
    if (finalCachedContent) return JSON.parse(finalCachedContent);
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

    const { data: financial } = content;

    const financialContent = {
      data: financeDetails,
      ...financial,
    };

    writeFile.execute(
      JSON.stringify(financialContent),
      "final-cached-content",
      "json"
    );

    return financialContent;
  }
}
