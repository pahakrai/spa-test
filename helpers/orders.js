import { Order } from "../models/index.js";

const createOrder = async function (order) {
  const newOrder = await Order.create(order);
  return newOrder;
};

export { createOrder };
