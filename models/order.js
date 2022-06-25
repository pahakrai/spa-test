import mongoose from "mongoose";

// const orderItem = new mongoose.Schema({
//   bookId: String,
//   qty: Number,
// });

const orderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  orderItems: {
    type: [
      {
        bookId: String,
        qty: Number,
      },
    ],
  },
  paymentRef: { type: String, required: true },
});

const Order = mongoose.model("Order", orderSchema);
export { Order };
