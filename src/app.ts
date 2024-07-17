import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./controllers/user/user.routes";
import addressRouter from "./controllers/address/address.routes";
import orderRouter from "./controllers/order/order.routes";
import productRouter from "./controllers/product/product.routes";
import reviewRouter from "./controllers/review/review.routes";
import categoryRouter from "./controllers/category/category.routes";

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

//routes
app.use(userRouter);
app.use(addressRouter);
app.use(orderRouter);
app.use(categoryRouter)
app.use(productRouter);
app.use(reviewRouter);

app.get("/", (req, res) => {
  return res.status(200).send({
    success: true,
    message: "Welcome back",
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
