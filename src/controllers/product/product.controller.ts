import { Category, Product, Request, Response } from "./product";

// Create a new product
export const addProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock, category } = req.body;
  try {
    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const product = new Product({
      name,
      description,
      price,
      stock,
      category
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all product
export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get a product by ID
export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a product by ID
export const updateProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock, category } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(404).json({ error: 'Category not found' });
      }
      product.category = category;
    }

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.stock = stock ?? product.stock;
    product.updatedAt = new Date();

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a product by ID
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.remove();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
};
