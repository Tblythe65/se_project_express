const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());
app.use("/", mainRouter);

// hardcoded id
app.use((req, res, next) => {
  req.user = {
    _id: "66cbac2036a8c42adb8d555a",
  };
  next();
});

module.exports.createClothingItem = (req, res) => {
  console.log(req.user._id);
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
