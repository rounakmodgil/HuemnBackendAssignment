var Book = require("../models/book");
var Subject = require("../models/subject");
var History = require("../models/history");
var Attendance= require("../models/attendance");

//Global variables
var date = new Date();

//middlewares
exports.check_availability = async function (req, res, next) {
    const { book } = req.body;
    Book.findById(book)
    .then((required_book)=>{
      if (required_book.availability) {
        next();
      }
      else{
        res.status(400).send("No available book");
      }
    })
    .catch((e)=>{
      console.log(e);
      res.status(500).send(e);
    })
};

exports.check_student= async function (req, res, next){
  const {student}= req.body;
  Attendance.find({student:student}).where('outtime').equals(null)
  .then((required_entry)=>{
    if(required_entry.length>0)
    {
      next();
    }
    else{
      res.status(400).send("Student Not in Library"); 
    }
  })
  .catch((e)=>{
    console.log(e);
    res.status(500).send(e);
  })
}


// Controllers
exports.book_list = async function (req, res) {
  const allbooks = await Book.find().populate("history");
  res.json(allbooks);
};

exports.create_book = function (req, res) {
  const { name, stock, available, availability, subject, branch } = req.body;
  const book = new Book({
    name: name,
    stock: stock,
    available: available,
    availability: availability,
    subject: subject,
    branch: branch,
  });
  book
    .save()
    .then((result) => {
      Subject.findByIdAndUpdate(subject, { $push: { books: result.id } })
        .then((r) => {
          res.send(result);
        })
        .catch((e) => {
          console.log(e);
          res.sendStatus(500);
        });
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
};

exports.available_books = async function (req, res) {
  const available_books = await Book.find({ availability: true }, {name:1, subject:1});
  res.json(available_books);
};

exports.get_book = async function (req, res) {
  try {
    const req_book = await Book.findById(req.params.id);
    res.json(req_book);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

exports.delete_book = async function (req, res) {
  try {
    const deleted_entry = await Book.findByIdAndDelete(req.params.id);
    res.json(deleted_entry);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

exports.assign_book = async function (req, res) {
  const { student, branch, book } = req.body;
  const history = new History({
    giventime: date.toISOString(),
    branch: branch,
    student: student,
  });
  history
    .save()
    .then((result) => {
      Book.findByIdAndUpdate(book, {$inc:{available:-1}, $push: { history: result.id } }, {new:true} )
        .then(async (r) => {
          if(r.available<=0){
            await Book.findByIdAndUpdate(book,{$set:{availability: false}});
          }
          console.log(r);
          res.send(result);
        })
        .catch((e) => {
          console.log(e);
          res.sendStatus(500);
        });
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
};

exports.return_book = async function (req, res) {
  const { id, book } = req.body;
  History.findByIdAndUpdate(id, {$set:{ recievedtime: date.toISOString(), availability:true }, $inc:{available:1}})
    .then(async (result) => {
      await Book.findByIdAndUpdate(book, {$set:{availability:true}, $inc:{available:1}})
      res.send(result);
    })
    .catch((e) => {
      res.sendStatus(500);
    });
};

exports.update_book=async function (req, res) {
  const { id, name, stock, available, availability, subject, branch } = req.body;
  try{
    const updated_book=await book.findByIdAndUpdate(id, {$set:{
      name: name,
      stock: stock,
      available: available,
      availability: availability,
      subject: subject,
      branch: branch,
    }});
    res.send(updated_book);
  }catch(e){
    console.log(e);
    res.sendStatus(400);
  }
};