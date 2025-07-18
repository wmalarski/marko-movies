import * as v from "valibot";

export const getNameValidation = () => {
  return v.pipe(v.string(), v.minLength(1));
}

export const getIntegerValidation = () => {
  return v.pipe(v.string(), v.transform(Number), v.minValue(0), v.integer());
}

export const getPageValidation = () => {
  return v.pipe(v.string(), v.transform(Number), v.minValue(1), v.integer());
}