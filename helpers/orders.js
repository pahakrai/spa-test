import { Order } from "../models/index.js";

const createOrder = function (order) {
  Order.create(order)
    .then(function (newOrder) {
      res.status(201).json(newOrder);
    })
    .catch(function (err) {
      res.send(err);
    });
};

export { createOrder };
