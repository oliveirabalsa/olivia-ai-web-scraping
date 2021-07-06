import express from "express";
import routes from "./web/routes";

const app = express();

app.use(express.json());
app.use(routes);

// app.use(GlobalError);
app.listen(3030, () => {
  console.log("Server is running");
});
