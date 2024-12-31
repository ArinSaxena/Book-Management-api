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

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
