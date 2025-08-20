import express, { Request, Response, NextFunction } from "express";
import path from "path";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swaggers";
import petRouter from "./routes/petRoute";
import userRouter from "./routes/userRoute";
import { errorHandler } from "./utils/errorHnadler";

dotenv.config();

const app = express();

// Middleware: JSON parser
app.use(express.json());

// Middleware: Static files
app.use(express.static(path.join(__dirname, "public")));

// Middleware: Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Logger
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Routes
app.use(userRouter); // User routes for registration and login
app.use(petRouter); //if you want pets to be JWT-protected

// Global Error Handler
app.use(errorHandler);

export default app;
