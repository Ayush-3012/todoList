import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://127.0.0.1:27017/todoListDB");

const todoSchema = {
  name: String,
};

const Todo = mongoose.model("Todo", todoSchema);

app.get("/", (req, res) => {
  Todo.find({})
    .then(function (todoItems) {
      res.render("index.ejs", { todoList: todoItems.reverse() });
      // mongoose.connection.close();
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/submit", (req, res) => {
  if (req.body["todo"] != "") {
    const item = new Todo({
      name: req.body["todo"],
    });

    item.save();
  }
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  Todo.findByIdAndRemove(req.body.checkedTodo)
    .then(function () {})
    .catch(function (err) {
      console.log(err);
    });
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
