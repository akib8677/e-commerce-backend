import {
  addOrder,
  deleteOrder,
  getAllOrder,
  getOrderById,
  Router,
  updateOrder,
} from "./order";

const orderRouter = Router();

orderRouter.post("api/order", addOrder);
orderRouter.get("/api/order", getAllOrder);
orderRouter.get("/api/order/:id", getOrderById);
orderRouter.put("/api/order/:id", updateOrder);
orderRouter.delete("/api/order/:id", deleteOrder);

export default orderRouter;
