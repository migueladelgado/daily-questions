const mongoose = require('mongoose');
const questionService = require('./questionService');
const userService = require('./userService');
const axios = require('axios');

const EVENT_TYPE = {
    GET_QUESTION: 'GetQuestion',
    PUT_QUESTION: 'PutQuestion'
}

const creatSMSMessage = (userId, questionId) => {
    return (
        'Click below to see your question!' +
        '\n' +
        `${process.env.BASE_CLIENT_URL}/${userId}/${questionId}`
    )
}

const mapToRequests = async user => {
    let question = await questionService.getUnansweredQuestion(user);
    //if no unanswered questions dont send text
    if(!question.length)
        return Promise.resolve();
    let text = creatSMSMessage(user._id, question[0]._id);
    let body = {
        from: process.env.FC_FROM_NUMBER,
        to: user.phone,
        text
    }

    let options = {
        auth: {
            username: process.env.FC_ACCOUNT_ID,
            password: process.env.FC_AUTH_TOKEN
        }
    }

    return axios.post(process.env.FC_API_URL, body, options);
}

//get active users from db to send messages
const sendSMS = async () => {
    let users = await userService.getAvailableUsers();
    let promises = users.map(mapToRequests);
    if(!promises.length)
        return Promise.resolve();
    return new Promise((resolve, reject) => {
        Promise.all(promises).then(
            () => {
                resolve(true)
            }
        ).catch(
            err => reject(err)
        )
    })
}

const handleEvent = async event => {
    event = JSON.parse(event.body);
    if(!event.type)
        return Promise.resolve('NO EVENT TYPE SUPPLIED');
    
    switch(event.type){
        case EVENT_TYPE.GET_QUESTION:
            return questionService.getQuestionById(event.data.questionId);
        case EVENT_TYPE.PUT_QUESTION:
            return userService.putQuestionToUser(event.data);
        default:
    }
}

const handleRequest = async event => {
    if(event && event.body)
        return handleEvent(event);
    return sendSMS();
}

module.exports.handleRequest = handleRequest;