const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ['Tutor', 'Student'],
        required: true,
    },
},
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('User', userSchema);
