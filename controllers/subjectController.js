var Subject = require("../models/subject");
var Branch = require("../models/branch");

//Global variables
let date = new Date();

// Display list of all subjects.
exports.subject_list = async function (req, res) {
  // const subjects = await Subject.find({createdAt:{$lt: date.toISOString()}}).populate("branch");
  const subjects = await Subject.find().populate("branch");
  res.json(subjects);
};

exports.create_subject = function (req, res) {
  const { name, branch } = req.body;
  const subject = new Subject({
    name: name,
    branch: branch,
  });
  subject
    .save()
    .then((result) => {
      Branch.findByIdAndUpdate(branch, { $push: { subjects: result.id } })
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

exports.get_subject = async function (req, res) {
  try {
    const req_subject = await Subject.findById(req.params.id);
    res.json(req_subject);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

exports.delete_subject = async function (req, res) {
  try {
    const deleted_entry = await Subject.findByIdAndDelete(req.params.id);
    res.json(deleted_entry);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

exports.subjects_stats= async function (req, res) {
  var finalresult=[];
  try{
    const subjects=await Subject.find().populate('books')
    subjects.map((s)=>{
      var freq=0;
      s.books.map((book)=>{freq=freq+book.history.length})
      var temp={
        sub_name:s.name,
        books_read:freq
      };
      finalresult.push(temp);
    });
    res.json(finalresult);
  }catch(e){
    console.log(e);
    res.sendStatus(400);
  }
};

exports.update_subject=async function (req, res) {
  const { id, name, branch } = req.body;
  try{
    const updated_subject=await Subject.findByIdAndUpdate(id, {$set:{name:name, branch:branch}});
    res.send(updated_subject);
  }catch(e){
    console.log(e);
    res.sendStatus(400);
  }
};