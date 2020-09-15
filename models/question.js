var mongoose = require('mongoose');

var OptionSchema = new mongoose.Schema({
    option: String,
    explain: String
});

var QuestionSchema = new mongoose.Schema({
    number: Number,
    question: String,
    type: String,
    options: [OptionSchema],
    answer: String
});

module.exports = mongoose.model('Question', QuestionSchema);