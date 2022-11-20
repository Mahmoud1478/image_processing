import images from "./images";
import { Router } from "express";

const routers = Router();

routers.use("/images", images);

export default routers;
