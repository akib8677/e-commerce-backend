import { Request, Response, Router } from "express";
import Category from "../../models/category";
import { Product } from "../order/order";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from "./product.controller";

export {
  Request,
  Response,
  Category,
  Router,
  Product,
  addProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
};
