import "dotenv/config";
import express from "express";
import { ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import path from "path";
import parser from "body-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import { bookRouter } from "./routes/books.js";
import { orderRouter } from "./routes/orders.js";
import { stripeRouter } from "./routes/stripe.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const CORS_ORIGIN_URI = `${process.env.HOST_URI}:${process.env.SERVER_PORT}`;

const { json } = parser;

app.set("trust proxy", 1);
app.use(json());
app.use(
  cors({
    origin: CORS_ORIGIN_URI,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  })
);

app.use("/api/books", bookRouter);
app.use("/api/orders", orderRouter);
app.use("/api/stripe", stripeRouter);

app.use(
  "/static",
  express.static(path.resolve(__dirname, "frontend", "static"))
);

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

const start = async () => {
  try {
    // mongoose.debug;
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
      // useCreateIndex: true,
    });

    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

app.listen(process.env.SERVER_PORT, () =>
  console.log(`SPA server running on localhost:${process.env.SERVER_PORT} ...`)
);

start();
