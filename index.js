const connectToMongo = require('./db/db');
const utils = require('./utils/utils');
const smsService = require('./services/smsService');


module.exports.handler = (event, context, done) => {
    
    connectToMongo().then(
        () => {
            smsService.handleRequest(event).then( results => {
                done(null, utils.createLambdaResponse(results))
                return;
            }).catch( err => {
                done(null, utils.createLambdaResponse(err))
                return;
            });
        }
    ).catch(
        err => {
            console.log('ERROR! => ', err)
            done(null, utils.createLambdaResponse(err));
            return;
        }
    )
}
