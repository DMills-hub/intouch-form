import { TypeOfTag } from "typescript";

export const isType = (value: any, typeOfTag: TypeOfTag) => {
  return typeof value === typeOfTag;
};
