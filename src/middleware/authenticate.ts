import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";

export function authenticate(req: any, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    res.status(401).send({
      status: 401,
      message: "Authorization Token is missing!",
      data: null,
    });
  } else {
    const token = req.headers.authorization.split(' ')[1]; // after 'Bearer '
    jwt.verify(token, process.env.SECRET_TOKEN || "", (err:any, decoded:any) => {
      if (err) {
        res.status(401).send({
          status: 401,
          message: err.message,
          data: null,
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
}
