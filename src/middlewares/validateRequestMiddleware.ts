import { Request, Response, NextFunction } from "express";
import { imageExists, thumbExists } from "../services/imageService";
import validator from "../validation/validator";

export const validatePramsMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const errors = validator(request, {
    name: ["required"],
    height: ["required", "intiger"],
    width: ["required", "intiger"],
  });

  if (errors.length) {
    return response.status(422).render("error", {
      code: 422,
      msg: "validation errors",
      errors,
    });
  }
  next();
};

export const imagetExistMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const name = req.query.name as string;

  if (!imageExists(name)) {
    return res.status(404).render("error", {
      code: 404,
      msg: "image not found",
      errors: [],
    });
  }

  next();
};

export const checkIfThumbExistMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const file = thumbExists(
    req.query.name as string,
    req.query.width as string,
    req.query.height as string
  );

  if (file) {
    return res.status(200).sendFile(file as string);
  }
  next();
};
