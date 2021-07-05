import { FinalcialsDetails } from "./FinalcialsDetails";
import { YearlyFinancial } from "./YearlyFinancial";

export interface Financials {
  stock: string;
  IPO: string;
  industry: string;
  data: FinalcialsDetails;
  yearlyFinancials: YearlyFinancial[];
}
