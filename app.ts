import express, { Request, Response, NextFunction } from "express";
import path from "path";
import dotenv from "dotenv";
import { swaggerUi, swaggerSpec } from "./swagger";
dotenv.config();

// imports Routes
import petRouter from "./routes/petRoute";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static(path.join(__dirname, 'public'))); 

// Handle Routes
app.use(petRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.url, req.method);
    next();
});

export default app;