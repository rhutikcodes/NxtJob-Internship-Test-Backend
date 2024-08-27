import { Request, Response, NextFunction } from "hono";


export const authMiddleware = (req: Request, res: Response, next: NextFunction) =>{

    next();
};