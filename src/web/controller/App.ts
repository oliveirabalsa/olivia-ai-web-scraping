import { AxiosInstance } from "axios";
import { Financials } from "../../domain/financials/Financials";
import { http } from "../../infra/integration/axios/config";
import { request, Request, Response } from "express";

export default class App {
  constructor() {}

  async init(req: Request, res: Response): Promise<any> {
    const first = await http.get("/login");
    return res.status(200).json(first.data);
  }
}
