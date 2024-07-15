import { Request, Response, Router } from "express";
import Category from "../../models/category";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  updateCategory,
} from "./category.controller";

export {
  Request,
  Response,
  Category,
  Router,
  addCategory,
  getAllCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
