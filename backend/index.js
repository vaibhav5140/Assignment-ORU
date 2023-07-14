const express = require("express");
const app = express();
const mongoose = require("mongoose");
const usersRouter = require("./routes/users"); // Import the users API router
const dotenv = require("dotenv");
const cors = require("cors");

app.use(express.json());
dotenv.config();
app.use(cors());

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("error: ", err));

app.get("/", (req, res) => {
  res.send("Welcome!");
});

// Use the users API router
app.use("/users", usersRouter);

app.listen(8000, () => {
  console.log("server is running");
});
