const Assignment = require('../models/assignments');
const Submission = require('../models/submission');
const { ObjectId } = require('mongoose').Types;

// CREATE ASSIGNMENTS
exports.createAssignment = async (req, res) => {
    try {
        const { title, description, publishedAt, status } = req.body;
        const tutorId = req.user._id;

        const assignment = await Assignment.create({
            title,
            description,
            publishedAt,
            status,
            tutor: tutorId,
        });

        return res.status(201).json(
            {
                message: "Assignment created successfully",
                data: assignment
            }
        );
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
};

// GET ALL THE ASSIGNMENT BY SPECIFIC-TUTOR
exports.getAssignmentFeed = async (req, res) => {
    try {
        if (!req.user || !req.user._id || req.user.userType != 'Tutor') {
            return res.status(401).json({ message: 'Unauthorized - User not authenticated' });
        }

        const tutorId = req.user._id;

        const assignments = await Assignment.find({ tutor: tutorId }).populate({
            path: 'tutor',
            select: '-password',
        });

        if (!assignments)
            return res.status(404).json({
                message: "Assignment not found"
            });

        return res.status(200).json({
            message: 'Assignments fetched successfully',
            data: assignments
        });
    } catch (err) {
        return res.status(500).json(err.message);
    }
};

// GET ASSIGNMENT DETAILS INCLUDING THE SUBMISSIONS BY ASSIGNED STUDENTS
exports.getAssignmentDetails = async (req, res) => {
    try {

        if (!req.user || !req.user._id || req.user.userType != 'Tutor') {
            return res.status(401).json({ message: 'Unauthorized - User not authenticated' });
        }
        const id = req.params._id;

        const assignment = await Assignment.findById(id).populate({
            path: 'tutor',
            select: '-password'
        });
        if (!assignment)
            return res.status(404).json({
                message: "Assignment not found with this _id"
            });

        const submissions = await Submission.find({ assignment: id })
            .populate({
                path: 'assignment',
            })
            .populate({
                path: 'student',
                select: '-password'
            });
        if (!submissions)
            return res.status(404).json({
                message: "Submissions not found with this _id"
            });

        return res.status(200).json({
            message: 'Assignments fetched successfully',
            data: { assignment, submissions }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json(error.message);
    }
};

// UPDATE THE ASSIGNMENT BY TUTOR
exports.updateAssignment = async (req, res) => {
    try {

        if (!req.user || !req.user._id || req.user.userType != 'Tutor') {
            return res.status(401).json({ message: 'Unauthorized - User not authenticated' });
        }
        const assignmentId = req.params._id;

        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized - User not authenticated' });
        }

        const { title, description, publishedAt, status } = req.body;

        const exist = await Assignment.findById(assignmentId);
        if (!exist)
            return res.status(404).json({
                message: "Assignment not found with this _id"
            });

        const assignment = await Assignment.findByIdAndUpdate(
            assignmentId,
            { title, description, publishedAt, status },
            { new: true }
        );

        return res.status(200).json(
            {
                message: "Assignment updated successfully",
                data: assignment
            }
        );
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// DELETE THE ASSIGNMENT BY TUTOR
exports.deleteAssignment = async (req, res) => {
    try {

        if (!req.user || !req.user._id || req.user.userType != 'Tutor') {
            return res.status(401).json({ message: 'Unauthorized - User not authenticated' });
        }
        const assignmentId = req.params._id;

        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized - User not authenticated' });
        }

        const deletedAssignment = await Assignment.findOneAndDelete({
            _id: assignmentId,
        });

        if (!deletedAssignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        return res.status(200).json({
            message: 'Deleted successfully',
            data: deletedAssignment
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
