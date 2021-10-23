const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/branch");

const port = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect to mongodb
const dbURI =
  "mongodb+srv://ankit:test1234@cluster0.7hnjp.mongodb.net/node-tut?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(port, () => {
      console.log("hurray listening on :", port);
    });
  })
  .catch((e) => {
    console.log(e);
  });

// routes

app.post("/add", (req, res) => {
  const { title, snippet, body } = req.body;
  const blog = new Blog({
    title: title,
    snippet: snippet,
    body: body,
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
});



app.get('/all-blogs', async(req, res)=>{
  var result=await Blog.find();
  res.json('ok'); 
});