const router = require('express').Router();
const TutorController = require('../controllers/tutorsController');
const Verify = require('../middlewares/authMiddleware');

router.post('/assignments', Verify, TutorController.createAssignment);
router.get('/assignments', Verify, TutorController.getAssignmentFeed);
router.get('/assignments/:_id', Verify, TutorController.getAssignmentDetails);
router.put('/assignments/:_id', Verify, TutorController.updateAssignment);
router.delete('/assignments/:_id', Verify, TutorController.deleteAssignment);

module.exports = router;
