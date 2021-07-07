import { Financials } from "../../domain/financials/Financials";

export default interface IExtractContentUseCase {
  execute(pageContent: string, pageCookies: string): Promise<any>;
}
