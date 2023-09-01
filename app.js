const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let comments = [
  {
    id: uuid(),
    username: "Ali",
    comment: "lol is so funny",
  },
  {
    id: uuid(),
    username: "Ahmad",
    comment: "lol is so funny",
  },
  {
    id: uuid(),
    username: "Amr",
    comment: "lol is so funny",
  },
  {
    id: uuid(),
    username: "Sam",
    comment: "lol is so funny",
  },
  {
    id: uuid(),
    username: "Alex",
    comment: "lol is so funny",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.post("/comments", (req, res) => {
  //   console.log(req.body);
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  //   res.send("IT WORKED");
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = newCommentText;
  res.redirect("/comments");
});
app.listen(3000, () => {
  console.log("ON PORT 3000!");
});
