import { Router } from "express";
import App from "../controller/App";

const routes = Router();

routes.get("/generate", App.init);

export default routes;
