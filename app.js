const express = require("express");
const path = require("path");

var mongoose = require("mongoose");
const bodyparser = require("body-parser");
mongoose
  .connect("mongodb://localhost:27017/foodielover", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection success"))
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

// **********************************************************************

// Schema bna rhe hum
var foodSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});
var Food = mongoose.model("Food", foodSchema);

// **********************************************************************

// Express file hai
app.use("/static", express.static("static")); // for serb=ving static file
app.use(express.urlencoded());

// Pug file hai
app.set("view engine", "pug"); // set the template pug
app.set("views", path.join(__dirname, "views")); // set views directiory

// **********************************************************************

app.get("/", (req, res) => {
  const ankit = { title: "FoodieLover.com" };
  res.status(200).render("in.pug", ankit);
});

// **********************************************************************

app.get("/about", (req, res) => {
  const ankit = { title: "FoodieLover.com" };
  res.status(200).render("about.pug", ankit);
});

// **********************************************************************

app.get("/suggestion", (req, res) => {
  const ankit = { title: "FoodieLover.com" };
  res.status(200).render("suge.pug", ankit);
});

// **********************************************************************

app.get("/contact", (req, res) => {
  const ankit = { title: "FoodieLover.com" };
  res.status(200).render("contact.pug", ankit);
});

app.post("/contact", (req, res) => {
  var myData = new Food(req.body);
  myData
    .save()
    .then(() => {
      res.status(201).render("contact.pug");
    })
    .catch(() => {
      res.status(404).send("Item not found");
    });
});

// **********************************************************************

// Server start
app.listen(port, () => {
  console.log(`Ye Chla Humra server port ${port} pe`);
});
