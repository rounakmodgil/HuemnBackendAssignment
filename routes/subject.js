var express = require('express');
var router = express.Router();

// Require controller modules.
var subject_controller = require('../controllers/subjectController');

router.get('/allsubjects', subject_controller.subject_list);
router.post('/createsubject', subject_controller.create_subject );
router.put('/update', subject_controller.update_subject);
router.get('/getsubject/:id', subject_controller.get_subject)
router.delete('/deletesubject/:id', subject_controller.delete_subject);
router.get('/stats', subject_controller.subjects_stats);

module.exports = router;