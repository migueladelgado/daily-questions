var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
    questionNumber: Number,
    answered: Boolean
});

var UserSchema = new mongoose.Schema({
    username: String,
    phone: String,
    active: Boolean,
    sendSMS: Boolean,
    verified: Boolean,
    dateCreated: Date,
    questions: [QuestionSchema]
});

module.exports = mongoose.model('User', UserSchema);