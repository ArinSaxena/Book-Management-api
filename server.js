const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bookModel = require("./model/bookModel");
const bookRoutes = require("./routes/bookRoutes");


const app = express();

app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 6060;
const MONGO_URL = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.use("/books", bookRoutes)



// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "404 - Not Found" });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
