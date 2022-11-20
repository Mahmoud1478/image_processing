import express, { Application, Request, Response } from "express";
import path from "path";
import routers from "./routes";
import ejs from "ejs";

const app: Application = express();
const port = 3000;

app.listen(port);

app.use(express.static(path.join(__dirname, "./public")));
app.set("views", path.join(__dirname, "./views"));
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");

app.use("/", routers);

app.get("/", (req: Request, res: Response): Response => {
  return res.send("Welcom To Image Processing API");
});

export default app;
