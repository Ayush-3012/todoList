import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 3000;
let todoList = new Array();
let todoList2 = new Array();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://127.0.0.1:27017/todoListDB");

const todoSchema = {
  name: String,
};

const Todo = mongoose.model("Todo", todoSchema);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  if (req.body["todo"] != "") {
    const item = new Todo({
      name: req.body["todo"],
    });

    Todo.insertMany([item])
      .then(function () {
        mongoose.connection.close();
      })
      .catch(function (err) {
        console.log(err);
      });

    const todo_item = item.name;
    todoList.push(todo_item);
    todoList2 = todoList.reverse();
  }

  res.render("index.ejs", { todoList: todoList2 });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
