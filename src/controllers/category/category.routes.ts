import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  Router,
  updateCategory,
} from "./category";

const categoryRouter = Router();

categoryRouter.post("api/category", addCategory);
categoryRouter.get("/api/category", getAllCategory);
categoryRouter.get("/api/category/:id", getCategory);
categoryRouter.put("/api/category/:id", updateCategory);
categoryRouter.delete("/api/category/:id", deleteCategory);

export default categoryRouter;
