import { Order, Product, Request, Response, User } from "./order";

// Create a new order
export const addOrder = async (req: Request, res: Response) => {
  const { userId, items, totalAmount } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ error: `Product not found: ${item.product}` });
      }
    }

    const order = new Order({
      user: userId,
      items,
      totalAmount,
      status: "Pending",
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllOrder = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user")
      .populate("items.product");
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  const { status, items, totalAmount } = req.body;
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = status ?? order.status;
    order.items = items ?? order.items;
    order.totalAmount = totalAmount ?? order.totalAmount;
    order.updatedAt = new Date();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    await order.remove();
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
