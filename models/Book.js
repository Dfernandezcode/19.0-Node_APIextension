const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    pages: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// once schema created - create model.
const Book = mongoose.model("Book", bookSchema);
module.exports = { Book };
