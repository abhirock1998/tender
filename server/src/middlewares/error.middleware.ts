import { NextFunction, Response, Request } from "express";

export const errorMiddleware = async (req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
};
