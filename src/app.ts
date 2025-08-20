import express, { Request, Response, NextFunction } from "express";
import path from "path";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swaggers";
import petRouter from "./routes/petRoute";
import userRouter from "./routes/userRoute";

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

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
