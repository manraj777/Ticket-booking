import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({
            message: "Unauthorized"
        });
        return;
    }
    try{
        const decoded = jwt.verify(token, JWT_PASSWORD);
         if(typeof decoded === "string"){
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        req.userId = decoded.userId ;
        next();
    }
    catch(e){
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
}