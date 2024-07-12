import { Request, Response, Router } from "express";
import User from "../../models/user";
import Product from "../../models/product";
import Order from "../../models/order";
import {
  addOrder,
  getAllOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "./order.controller";

export {
  Request,
  Response,
  User,
  Order,
  Product,
  Router,
  addOrder,
  getAllOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
};
