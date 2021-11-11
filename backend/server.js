const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./Routes/user");
const postRouter = require("./Routes/post");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Db Connected");
  }
);

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use("/user", userRouter);
app.use("/post", postRouter);

app.get("/", (req, res) => {
  res.send("Nanji server");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server listening on port: " + PORT));
