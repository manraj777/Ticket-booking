require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import v1Router from "./routes/v1";
const app = express();

app.use(express.json());
app.use("/api/v1", v1Router);
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        message: "Not Found"
    });
})
app.listen(process.env.PORT || 8080);