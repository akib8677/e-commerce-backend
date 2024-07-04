import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

//Cors
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  return res.status(200).send({
    success: true,
    message: "Welcome back",
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
