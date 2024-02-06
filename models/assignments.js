const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    publishedAt: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['SCHEDULED', 'ONGOING'],
        required: true,
    },
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},
    { timestamps: true, versionKey: false });

module.exports = mongoose.model('Assignment', assignmentSchema);
