const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./errorHandler/errorHandler");
const connectDB = require("./db");
const gymRoutes = require("./routes/gymRoutes");
const gymMembers = require("./models/gymMembers");
const methodOverride = require("method-override");

const app = express();

connectDB();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

const port = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  const gymMembersSorted = await gymMembers.find().sort({ createdAt: "desc" });
  res.render("articles/index", { gymMembers: gymMembersSorted });
});

app.use("/articles", gymRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
