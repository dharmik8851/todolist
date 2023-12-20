const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { render } = require("ejs");
const path = require("path");

//list : default collection for storing tasks
// const listSchema = mongoose.Schema({name : String});
// const List = mongoose.model("List",listSchema);

//customList : used to create list with custom name
const customListSchema = mongoose.Schema({ name: String, list: [String] });
const CustomList = mongoose.model("CustomList", customListSchema);

//default items shown on list
const item1 = "Welcome to your todolist!";
const item2 = "Hit the + button to add a new item.";
const item3 = "<-- Hit this to delete an item.";
const itemsDefault = [item1, item2, item3];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
mongoose.connect(
  process.env.mongo_db;
);

app.post("/name", function (req, res) {
  let userName = req.body.name;
  res.redirect("/" + userName);
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/css/index.html"));
});

//inserting data to database
app.post("/", function (req, res) {
  let item = req.body.additem;
  let title = req.body.title;

  main().catch((err) => console.log(err));
  async function main() {
    const found = await CustomList.findOne({ name: title });
    found.list.push(item);
    found.save();
    res.redirect("/" + title);
  }
});

//deleting data from database
app.post("/delete", function (req, res) {
  console.log(req.body);
  const index = req.body.checkbox;
  const title = req.body.title;

  main().catch((err) => console.log(err));
  async function main() {
    const found = await CustomList.findOne({ name: title });
    found.list.splice(index, 1);
    found.save();
    res.redirect("/" + title);
  }
});

//customList
app.get("/:listTitle", function (req, res) {
  let title = req.params.listTitle;
  console.log("my title is -> " + title);

  main().catch((err) => console.log(err));

  async function main() {
    //check if list with given name exist in database or not.
    let custom_list = await CustomList.findOne({ name: title });

    //if list does not exist then create new List;
    if (!custom_list) {
      console.log("list does not exist");
      await new CustomList({ name: title, list: itemsDefault }).save();
      res.redirect("/" + title);
    }
    //if list exist then render list values;
    else {
      //show an existing list
      if (custom_list.list.length === 0) {
        custom_list.list = itemsDefault;
        custom_list.save();
      }
      console.log("exist");
      res.render("list", { Title: custom_list.name, Items: custom_list.list });
    }
  }
});

app.listen(3000, function () {
  console.log("Server running at port 3000");
});
