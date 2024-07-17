import { Category, Product, Request, Response, Review, User } from "./review";

// Create a new Review
export const addReview = async (req: Request, res: Response) => {
    const { user, product, rating, comment } = req.body;
    try {
      const userExists = await User.findById(user);
      if (!userExists) {
        return res.status(404).json({ error: 'User not found' });
      }

      const productExists = await Product.findById(product);
      if (!productExists) {
        return res.status(404).json({ error: 'Product not found' });
      }
      const review = new Review({
        user,
        product,
        rating,
        comment
      });
      const savedReview = await review.save();
      res.status(201).json(savedReview);
    } catch (error) {
      res.status(500).json(error);
    }
};

// Get all Review
export const getAllReview = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find().populate('user').populate('product');
    res.json(reviews);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get a Review by ID
export const getReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id).populate('user').populate('product');
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a Review by ID
export const updateReview = async (req: Request, res: Response) => {
  const { rating, comment } = req.body;
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;
    review.updatedAt = new Date();

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a Review by ID
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    await review.remove();
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
};
