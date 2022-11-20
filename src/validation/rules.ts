import { RulesObject, ValidationResult } from "../types/validation";

export const intiger = (name: string, value: string): ValidationResult => {
  return {
    value: !/^\d+$/.test(value),
    msg: `${name} must be a valid integer`,
  };
};

export const required = (name: string, value: string): ValidationResult => {
  return {
    value: value ? false : true,
    msg: `${name} is required`,
  };
};
const rules: RulesObject = {
  intiger,
  required,
};

export default rules;
