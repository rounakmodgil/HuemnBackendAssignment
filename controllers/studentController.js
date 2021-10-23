var Student = require('../models/student');
var Branch = require('../models/branch');
var Attendance = require('../models/attendance');

//Global Variables
var date = new Date();

// Display list of all students.
exports.student_list = async function(req, res) {
    const students= await Student.find();
    res.json(students);
};

exports.create_student = function(req, res) {
    const { name, branch } = req.body;
    const student=new Student({
        name:name,
        branch:branch
    });
    student.save()
    .then((result)=>{
        Branch.findByIdAndUpdate(branch, { $push: { students: result.id } })
        .then((r) => {
          res.send(result);
        })
        .catch((e) => {
          console.log(e);
          res.sendStatus(500);
        });
    })
    .catch((e)=>{
        console.log(e);
        res.sendStatus(500);
    })
};

exports.student_intimeattendance=function(req, res){
    const {student, branch}=req.body;
    const attendance= new Attendance({
        intime:date.toISOString(),
        student:student,
        branch:branch
    });
    attendance.save()
    .then((result)=>{
        Student.findByIdAndUpdate(student,  {$push: { attendance: result.id } })
        .then((r)=>{
            res.send(result);
        })
        .catch((e) => {
            console.log(e);
            res.sendStatus(500);
        });
    })
    .catch((e)=>{
        console.log(e);
        res.sendStatus(500);
    })
};

exports.student_outtimeattendance=function(req, res){
    const {id}= req.body;
    Attendance.findByIdAndUpdate(id, {outtime:date.toISOString()})
    .then((result)=>{
        res.send(result);
    }).catch((e)=>{
        console.log(e);
        res.sendStatus(500);
    })
};

exports.get_student = async function (req, res) {
    try {
      const req_student = await Student.findById(req.params.id);
      res.json(req_student);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
};

exports.delete_student = async function (req, res) {
    try {
      const deleted_entry = await Student.findByIdAndDelete(req.params.id);
      res.json(deleted_entry);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
};

exports.numberof_student= async function(req,res) {
    const total_present=await Attendance.find({intime:{$gte: req.query.from, $lt: req.query.to}, staff:null});
    var result={
        numberOfStudents: total_present.length
    }
    res.send(result);
};

exports.attendance_student=async function(req, res) {
    const required_record= await Attendance.find({student:req.params.id});
    res.send(required_record);
};

exports.update_student=async function (req, res) {
    const { id, name, branch } = req.body;
    try{
      const updated_student=await Student.findByIdAndUpdate(id, {$set:{name:name, branch:branch}});
      res.send(updated_student);
    }catch(e){
      console.log(e);
      res.sendStatus(400);
    }
  };