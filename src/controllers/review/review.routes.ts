import { addReview, deleteReview, getAllReview, getReview, Router, updateReview } from "./review";

const reviewRouter = Router();

reviewRouter.post("api/review", addReview);
reviewRouter.get("/api/review", getAllReview);
reviewRouter.get("/api/review/:id", getReview);
reviewRouter.put("/api/review/:id", updateReview);
reviewRouter.delete("/api/review/:id", deleteReview);

export default reviewRouter;
