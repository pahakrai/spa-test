import { Order } from "../models/index.js";

const createOrder = function (req, res) {
  Order.create(req.body)
    .then(function (newOrder) {
      res.status(201).json(newOrder);
    })
    .catch(function (err) {
      res.send(err);
    });
};

export { createOrder };
