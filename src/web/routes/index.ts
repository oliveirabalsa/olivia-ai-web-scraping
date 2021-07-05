import { Router, Request, Response } from "express";
import App from "../controller/App";

const app = new App();
const routes = Router();

routes.get("/", app.init);

export default routes;
