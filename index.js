const express = require("express");
const mongoose = require("mongoose");

//Importing Routers
var branchRouter = require("./routes/branch");
var bookRouter = require("./routes/book");
var staffRouter = require("./routes/staff");
var studentRouter = require("./routes/student");
var subjectRouter = require("./routes/subject");

//Global Variables
const port = 3000;

//Creating an instance of express with enbling body parser.
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connect to mongodb
const dbURI =
  "mongodb+srv://ankit:test1234@cluster0.7hnjp.mongodb.net/node-tut?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(port, () => {
      console.log("listening on: ", port);
    });
  })
  .catch((e) => {
    console.log(e);
  });

  app.use('/branch', branchRouter);
  app.use('/book', bookRouter);
  app.use('/staff', staffRouter);
  app.use('/student', studentRouter);
  app.use('/subject', subjectRouter);

















// const express= require('express');

// const api_helper=require('./scrap/API_helper');
// const port = 3000;

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

// //middleware
// const mid=(req, res, next)=>{
//     res.sendStatus(400);
//     next();
// }

// //GET PUT POST DELETE
// //req has params for /:id and query /:id?blah=3

// app.get('/',mid,(req, res)=>{
//     api_helper.make_API_call('https://jsonplaceholder.typicode.com/todos/1')
//     .then(response => {
//         res.json(response)
//     })
//     .catch(error => {
//         res.send(error)
//     })
// });

// app.get('/products/:id', (req, res)=>{
//     api_helper.make_API_call('https://jsonplaceholder.typicode.com/todos/1')
//     .then(response => {
//         var temp=response;
//         res.json(temp.find((prod)=>{
//             return +req.params.id===prod.id;
//         }))
//     })
//     .catch(error => {
//         res.send(error)
//    })
// });

// app.post('/add', (req,res)=>{
//     console.log(req.body.id)
//     res.sendStatus(200);
// })

// app.listen(port, ()=>{console.log("listening on: ", port)});
