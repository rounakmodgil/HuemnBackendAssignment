var express = require('express');
var router = express.Router();

// Require controller modules.
var book_controller = require('../controllers/bookController');

router.get('/allbooks', book_controller.book_list);
router.post('/createbook', book_controller.create_book );
router.get('/availablebooks', book_controller.available_books);
router.get('/getbook/:id', book_controller.get_book);
router.delete('/deletebook/:id', book_controller.delete_book);
router.post('/request', book_controller.check_student, book_controller.check_availability, book_controller.assign_book);
router.put('/return', book_controller.return_book);
router.put('/updatebook', book_controller.update_book);

module.exports = router;