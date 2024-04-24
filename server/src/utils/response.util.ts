import { Response } from "express";
export const _response = (
  res: Response,
  msg: string,
  success: true,
  code: number,
  data: any
) => {
  return res.status(code).json({ message: msg, success, data });
};
