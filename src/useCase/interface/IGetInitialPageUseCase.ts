import { Request, Response } from "express";
export default interface IGetInitialPageUseCase {
  execute(response: Response): Promise<string>;
}
