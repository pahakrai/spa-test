import express from "express";
import { createOrder } from "../helpers/orders.js";
const router = express.Router();

/* APIs 
   - POST     /api/orders/book/:bookId // Create Order of Book
*/

router.route("/book/:bookId").post(createOrder);

export { router as orderRouter };
