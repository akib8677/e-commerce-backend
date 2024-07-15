import { Category, Request, Response } from "./category";

// Create a new category
export const addCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  try {
    const category = new Category({ name, description });
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all categories
export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a category by ID
export const getCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a category by ID
export const updateCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.name = name ?? category.name;
    category.description = description ?? category.description;
    category.updatedAt = new Date();

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a category by ID
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    await category.remove();
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};
