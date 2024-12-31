const mongoose = require("mongoose");
const express = require("express");
const Book = require("../model/bookModel.js");

const route = express.Router();

//create book

route.post("/create", async(req, res) => {
  try {
    const { title, author, publishedDate, genre, price } = req.body;
    const book = new Book({ title, author, publishedDate, genre, price });
    await book.save();
    res.status(200).json({ message: "Created Book" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

route.get("/get", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

route.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      res.status(404).json({ message: "book not found" });
    }
    res.status(200).json({ message: "Book updated successfully", updatedBook });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

route.delete("/delete/:id" ,async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({message:"Book deleted successfully"});
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = route;
