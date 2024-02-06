const Assignment = require('../models/assignments');
const Submission = require('../models/submission');
const { ObjectId } = require('mongoose').Types;

// CREATE SUBMISSION
exports.addSubmission = async (req, res) => {
    try {
        const assignmentId = req.params._id;
        const { content, status } = req.body;
        const studentId = req.user._id;

        const submission = await Submission.create({
            content,
            status,
            student: studentId,
            assignment: assignmentId,
        });

        return res.status(201).json(
            {
                message: "Submission created successfully",
                data: submission
            }
        );
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
};

// GET ALL THE ASSIGNMENT BY SPECIFIC-STUDENT
exports.getAssignmentFeed = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized - User not authenticated' });
        }
        const studentId = req.user._id;
        const submissions = await Submission.find({ student: studentId })
        .populate({
            path: 'student',
            select: '-password'
        })
        .populate({
            path: 'assignment',
        });

        if (!submissions) {
            return res.status(404).json({
                message: 'Submission not found for this student',
            });
        }
        return res.status(200).json({
            message: 'Submissions fetched successfully',
            data: submissions
        });
    } catch (err) {
        return res.status(500).json(err.message);
    }
};

// GET ASSIGNMENT DETAILS INCLUDING THE SUBMISSIONS BY ASSIGNED STUDENTS
exports.getAssignmentDetails = async (req, res) => {
    try {
        const id = req.params._id;
        const studentId = req.user._id;

        const submission = await Submission.find({ assignment: id, student: studentId })
            .populate({
                path: 'student',
                select: '-password'
            })
            .populate({
                path: 'assignment',
            });

        if (!submission) {
            return res.status(404).json({
                message: 'Submission not found for this assignment and student',
            });
        }

        return res.status(200).json({
            message: 'Submission fetched successfully',
            data: submission,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json(error.message);
    }
};
