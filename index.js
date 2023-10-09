const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoriesRoute = require("./routes/categoreis");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

dotenv.config();
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongooDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/blog/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been upload");
});

app.use("/blog/auth", authRoute);
app.use("/blog/users", userRoute);
app.use("/blog/posts", postRoute);
app.use("/blog/categories", categoriesRoute);

app.listen("5000", () => {
  console.log("Backend is running");
});
