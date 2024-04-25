import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import { _response } from "@utils/response.util";
export const validatePayload = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (e: any) {
      _response(res, e.errors, false, 400, {});
    }
  };
};
