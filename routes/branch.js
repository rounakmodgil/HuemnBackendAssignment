var express = require('express');
var router = express.Router();

// Require controller modules.
var branch_controller = require('../controllers/branchController');

router.get('/allbranches', branch_controller.branch_list);
router.post('/createbranch', branch_controller.create_branch );
router.post('/getbranch/:id', branch_controller.get_branch );
router.delete('/deletebranch/:id', branch_controller.delete_branch);
router.put('/update', branch_controller.update_branch)
module.exports = router;