import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: { type: Number, default: 0 },
  thumbnailUrl: { type: String, default: null },
  authors: { type: [String], default: [] },
  categories: { type: [String], default: [] },
  //   created_date: {
  //     type: Date,
  //     default: Date.now(),
  //   },
});

const Book = mongoose.model("Book", bookSchema);
export { Book };
