import cheerio from "cheerio";
import { FinancialsDetails } from "../../domain/financials/FinancialsDetails";

class ExtractFinancialDetailsHelper {
  execute(pageContent: string): FinancialsDetails {
    const $ = cheerio.load(pageContent);
    const data = $("tr > td")
      .toArray()
      .map((item) => $(item).text())
      .slice(0, 18);

    const concateData = data.reduce(
      (acc: any, cur: any, index: number): any => {
        acc[cur] = data[index + 1];
        data.splice(index + 1, 1);
        return acc;
      },
      {}
    );
    return concateData;
  }
}

export default new ExtractFinancialDetailsHelper();
