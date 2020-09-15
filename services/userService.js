const mongoose = require('mongoose');
const UserModel = require('../models/users');


//get all users that should get sms messages
const getAvailableUsers = () => {
    let filter = {
        active: true,
        sendSMS: true,
        verified: true
    };
    return UserModel.find(filter);
}

//put question in question array when answered
const putQuestionToUser = async data => {
    return new Promise((resolve, reject) => {
        let { userId, questionId, answered, givenAnswer, correct } = data;
        let filter = { _id : mongoose.Types.ObjectId(userId)};
        let questionToPush = { questionId, answered, givenAnswer, correct };
        let update = { $push : { questions : questionToPush }};
        UserModel.findOneAndUpdate(filter, update, (err, result) => {
            if(err) reject(err);
            resolve(true);
        });
    })
}

module.exports.getAvailableUsers = getAvailableUsers;
module.exports.putQuestionToUser = putQuestionToUser;