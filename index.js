import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let todoList = new Array();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  if (req.body["todo"]) {
    const todo_item = req.body["todo"];
    todoList.push(todo_item);
  }
  res.render("index.ejs", { todoList: todoList.reverse() });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
