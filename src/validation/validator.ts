import { Request } from "express";
import { ErrorInterface } from "../interfaces/errorInterface";
import { ValidatorPrem } from "../types/validation";
import rulesCallbacks from "./rules";

const validator = (
  request: Request,
  prams: ValidatorPrem
): ErrorInterface[] => {
  const errors: ErrorInterface[] = [];
  for (const [name, rules] of Object.entries(prams)) {
    rules.forEach((rule) => {
      const { value, msg } = rulesCallbacks[rule](name, request.query[name]);
      if (value) {
        errors.push({
          key: name,
          value: msg,
        });
      }
    });
  }
  return errors;
};

export default validator;
