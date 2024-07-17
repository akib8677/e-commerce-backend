import { Request, Response, Router } from "express";
import Category from "../../models/category";
import { Product, User } from "../order/order";
import Review from "../../models/review";
import {
  addReview,
  deleteReview,
  getAllReview,
  getReview,
  updateReview,
} from "./review.controller";

export {
  Request,
  Response,
  Category,
  Router,
  Product,
  User,
  addReview,
  deleteReview,
  getAllReview,
  getReview,
  updateReview,
  Review,
};
