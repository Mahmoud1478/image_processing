import { Request, Response, Router } from "express";
import {
  validatePramsMiddleware,
  imagetExistMiddleware,
  checkIfThumbExistMiddleware,
} from "../middlewares/validateRequestMiddleware";
import { transform } from "../services/imageService";

const images = Router();

const middlewares = [
  validatePramsMiddleware,
  imagetExistMiddleware,
  checkIfThumbExistMiddleware,
];

images.get(
  "/",
  middlewares,
  async (req: Request, res: Response): Promise<void> => {
    const name = req.query.name as string,
      width = parseInt(req.query.width as string) as number,
      height = parseInt(req.query.height as string) as number;
    try {
      return res
        .status(200)
        .sendFile((await transform(name, width, height)) as string);
    } catch (error) {
      return res.status(500).render("error", {
        code: 500,
        msg: error,
        errors: [],
      });
    }
  }
);
export default images;
