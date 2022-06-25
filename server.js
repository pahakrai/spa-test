import express from "express";
import { ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import path from "path";
import { bookRouter } from "./routes/books.js";
import { orderRouter } from "./routes/orders.js";
// import parser from 'body-parser';
// import cors from 'cors';
// import cookieSession from 'cookie-session';
// import { authRouter } from './routes/auth.js';

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const CORS_ORIGIN_URI = 'http://localhost:8080';
const MONGO_URI =
  "mongodb+srv://pahak_87:nH5W6Tl5PfkTWbLS@cluster0.7l2k8.mongodb.net/spa?retryWrites=true&w=majority";

const app = express();

// const {json} = parser;

// app.set('trust proxy', 1);
// app.use(json());
// app.use(cors({
//     origin: CORS_ORIGIN_URI,
//     methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
//     credentials: true
// }));
// app.use(
//     cookieSession({
//         signed: false,
//         secure: false
//     })
// );
// app.use(authRouter);
app.use("/api/books", bookRouter);
app.use("/api/orders", orderRouter);

app.use(
  "/static",
  express.static(path.resolve(__dirname, "frontend", "static"))
);

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

const start = async () => {
  try {
    mongoose.debug;
    await mongoose.connect(process.env.MONGO_URI || MONGO_URI, {
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

app.listen(process.env.PORT || 8080, () =>
  console.log(`SPA server running on localhost:${process.env.PORT || 8080} ...`)
);

start();
