const axios = require('axios').default;
const UserModel = require('../models/users')

//get all users that should get sms messages
const getAuthorizedUsers = () => {
    let filter = {
        active: true,
        sendSMS: true,
        verified: true
    };
    return UserModel.find(filter);
}

const getRandomQuestion = async () => {
    return new Promise((resolve, reject) => {
        resolve('some random question')
    });
}

const mapToRequests = async user => {
    let body = {
        from: process.env.FC_FROM_NUMBER,
        to: user.phone,
        text: await getRandomQuestion()
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
    let users = await getAuthorizedUsers();
    let promises = users.map(mapToRequests);
    return Promise.all(promises);
}

const handleRequest = async event => {
    if(event && event.body)
        return;
    return sendSMS();
}

module.exports.handleRequest = handleRequest;