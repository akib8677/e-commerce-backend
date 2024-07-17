import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  Router,
  updateProduct,
} from "./product";

const productRouter = Router();

productRouter.post("api/product", addProduct);
productRouter.get("/api/product", getAllProduct);
productRouter.get("/api/product/:id", getProduct);
productRouter.put("/api/product/:id", updateProduct);
productRouter.delete("/api/product/:id", deleteProduct);

export default productRouter;
