var express = require('express');
var router = express.Router();

// Require controller modules.
var student_controller = require('../controllers/studentController');

router.get('/allstudents', student_controller.student_list);
router.post('/createstudent', student_controller.create_student);
router.post('/intimeattendance', student_controller.student_intimeattendance );
router.put('/outtimeattendance', student_controller.student_outtimeattendance );
router.get('/getstudent/:id', student_controller.get_student)
router.delete('/deletestudent/:id', student_controller.delete_student);
router.get("/inlibrary", student_controller.numberof_student)
router.get("/attendance/:id", student_controller.attendance_student);
router.put('/update', student_controller.update_student)

module.exports = router;