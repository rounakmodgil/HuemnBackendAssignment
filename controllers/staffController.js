var Staff = require("../models/staff");
var Branch = require("../models/branch");
var Attendance = require("../models/attendance");

//Global Variables
var date = new Date();

//middleware
// exports.error_onStudent = async function (req, res, next) {
//     if(!req.headers.authorization){
//         res.status(400).send("Check Bearer Token");
//     }
//     const id = req.headers.authorization.substr(7);
//      Student.findById(id)
//     .then((student_entry)=>{
//         if(student_entry){
//             console.log(student_entry);
//             res.status(400).send("Student Not Allowed To Perform This Action");
//         }
//     }).catch((e)=>{
//         res.status(500).send(e);
//     })

//     Staff.findById(id)
//     .then((staff_entry)=>{
//         if(staff_entry){
//             console.log('hoi',staff_entry);
//             next();
//         }
//         else{
//             res.status(400).send("Check Bearer Token");
//         }
//     }).catch((e)=>{
//         res.status(500).send(e);
//     })  
// };

// Display list of all staff.
exports.staff_list = async function (req, res) {
  const staffs = await Staff.find();
  res.json(staffs);
};

exports.create_staff = function (req, res) {
  const { name, designation, access, branch } = req.body;
  const staff = new Staff({
    name: name,
    role: {
      designation: designation,
      access: access,
    },
    branch: branch,
  });
  staff
    .save()
    .then((result) => {
      Branch.findByIdAndUpdate(branch, { $push: { staffs: result.id } })
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

exports.staff_intimeattendance = function (req, res) {
  const { staff, branch } = req.body;
  const attendance = new Attendance({
    intime: date.toISOString(),
    staff: staff,
    branch: branch,
  });
  attendance
    .save()
    .then((result) => {
      Staff.findByIdAndUpdate(staff, { $push: { attendance: result.id } })
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

exports.staff_outtimeattendance = function (req, res) {
  const { id, outtime } = req.body;
  Attendance.findByIdAndUpdate(id, { outtime: date.toISOString() })
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
};

exports.get_staff = async function (req, res) {
  try {
    const req_staff = await Staff.findById(req.params.id).populate(
      "attendance"
    );
    res.json(req_staff);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

exports.delete_staff = async function (req, res) {
  try {
    const deleted_entry = await Staff.findByIdAndDelete(req.params.id);
    res.json(deleted_entry);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

exports.numberof_staff = async function (req, res) {
  const total_present = await Attendance.find({
    intime: { $gte: req.query.from, $lt: req.query.to },
    student:null
  });
 
  var result = {
    numberOfStaffs: total_present.length,
  };
  res.send(result);
};

exports.attendance_staff = async function (req, res) {
//   console.log(req.headers.authorization.substr(7));
//   res.send("blee");
  const required_record= await Attendance.find({staff:req.params.id});
  res.send(required_record);
};

exports.update_staff = async function (req, res) {
  const { id, name, designation, access, branch } = req.body;
  try {
    const updated_staff = await Staff.findByIdAndUpdate(id, {
      $set: {
        name: name,
        role: {
          designation: designation,
          access: access,
        },
        branch: branch,
      },
    });

    res.send(updated_staff);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};
