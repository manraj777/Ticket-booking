import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const middleware = (secret: string) => (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({
                message: "Unauthorized"
            });
            return;
        }
        try{
            const decoded = jwt.verify(token, secret);
            if(typeof decoded === "string"){
                res.status(401).json({
                    message: "Unauthorized"
                });
                return;
            }
            req.userId = decoded.userId ;
            next();
        }
        catch(e){
            res.status(401).json({
                message: "Unauthorized"
            });
            return;
        }
}