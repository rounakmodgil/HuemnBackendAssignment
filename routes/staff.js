var express = require('express');
var router = express.Router();

// Require controller modules.
var staff_controller = require('../controllers/staffController');

router.get('/allstaffs',  staff_controller.staff_list);
router.post('/createstaff', staff_controller.create_staff);
router.post('/intimeattendance', staff_controller.staff_intimeattendance );
router.put('/outtimeattendance', staff_controller.staff_outtimeattendance );
router.get('/getstaff/:id', staff_controller.get_staff)
router.delete('/deletestaff/:id', staff_controller.delete_staff);
router.get("/inlibrary", staff_controller.numberof_staff);
router.get("/attendance/:id", staff_controller.attendance_staff);
router.put('/update', staff_controller.update_staff)

module.exports = router;