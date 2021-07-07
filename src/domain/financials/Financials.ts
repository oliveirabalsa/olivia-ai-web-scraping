import { FinancialsDetails } from "./FinancialsDetails";
import { YearlyFinancial } from "./YearlyFinancial";

export interface Financials {
  stock: string;
  IPO: string;
  industry: string;
  data: FinancialsDetails;
  yearlyFinancials: YearlyFinancial[];
}
