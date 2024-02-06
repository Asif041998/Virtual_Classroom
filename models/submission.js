const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['PENDING', 'OVERDUE', 'SUBMITTED'],
        required: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true,
    },
},
    { timestamps: true, versionKey: false });

module.exports = mongoose.model('Submission', submissionSchema);
