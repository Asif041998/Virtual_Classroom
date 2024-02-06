const router = require('express').Router();
const StudentController = require('../controllers/studentsController');
const Verify = require('../middlewares/authMiddleware');

router.post('/submissions/:_id', Verify, StudentController.addSubmission);
router.get('/submissions', Verify, StudentController.getAssignmentFeed);
router.get('/submissions/:_id', Verify, StudentController.getAssignmentDetails);

module.exports = router;
