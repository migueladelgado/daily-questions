const QuestionModel = require('../models/question');
const mongoose = require('mongoose');

const getUnansweredQuestion = async user => {
    return new Promise( async (resolve, reject) => {
        let questionsUserAnswered = user.questions.map(
            question => mongoose.Types.ObjectId(question.questionId)
        );
        let filter = {
            _id : {
                $nin : questionsUserAnswered
            }
        }
        QuestionModel
            .find(filter)
            .limit(1)
            .then(
                question => {
                    resolve(question)
                }
            ).catch(
                err => reject(err)
            )
    });
}

const getQuestionById = async id => {
    return new Promise( async (resolve, reject) => {
        QuestionModel.findById(id, (err, result) =>{
            if(err)
                reject(err);
            resolve(result);
        });
    });
}

module.exports.getUnansweredQuestion = getUnansweredQuestion;
module.exports.getQuestionById = getQuestionById;