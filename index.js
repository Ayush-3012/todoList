import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 3002;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose
  .connect(
    // "mongodb+srv://Ayush-3012:Champ%403012@cluster0.vjzwy0h.mongodb.net/todoListDB"
    "mongodb://127.0.0.1:27017/todoListDB"
  )
  .then((res) =>
    console.log(
      "MongoDB Connected :",
      res.connection.name,
      "!! DB HOST : ",
      res.connection.host
    )
  )
  .catch((err) => console.log(err));

// const todoSchema = {
//   name: String,
// };

const todoSchema = mongoose.Schema({ name: String }, { timestamps: true });

const Todo = mongoose.model("Todo", todoSchema);

app.get("/", (req, res) => {
  // Todo.find({})
  //   .then(function (todoItems) {
  //     res.render("index.ejs", { todoList: todoItems.reverse() });
  //     // mongoose.connection.close();
  //   })
  //   .catch(function (err) {
  //     console.log(err);
  //   });
  Todo.find({})
    .then((todoItems) => {
      res.render("index.ejs", { todoList: todoItems.reverse() });
    })
    .catch((err) => console.log(err));
});

app.post("/submit", (req, res) => {
  const { todo } = req.body;
  if (!todo) return res.status(402).json("Todo not recieved");

  const item = new Todo({
    name: todo,
  });

  item.save();

  res.redirect("/");
});

app.post("/delete", (req, res) => {
  Todo.findByIdAndRemove(req.body.checkedTodo)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
