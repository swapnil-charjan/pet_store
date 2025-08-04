import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL!)
  .then(() => {
    console.log('MongoDB Connected successfully..!');
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error('MongoDB connection error:', err);
  });