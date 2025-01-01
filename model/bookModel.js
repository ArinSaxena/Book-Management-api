const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength:1
    },
    author: {
      type: String,
      required: true,
      minlength:1

    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
    genre: {
      type: String,
    },
    price: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("books", BookSchema);
