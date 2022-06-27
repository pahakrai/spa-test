import mongoose from "mongoose";

// const orderItem = new mongoose.Schema({
//   bookId: String,
//   qty: Number,
// });

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  orderItems: {
    type: [
      {
        productId: String,
        qty: Number,
      },
    ],
  },
  paymentRef: { type: String, required: true },
});

const Order = mongoose.model("Order", orderSchema);
export { Order };
