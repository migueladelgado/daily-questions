const db = require('./db/db');
const utils = require('./utils/utils');
const smsService = require('./services/smsService');


module.exports.handler = (event, context, done) => {

    if(event && !utils.isValidLambdaRequest(event)){
        done(null, utils.createLambdaResponse('NOTHING TO SEE HERE!'));
        return;
    }

    db.connectToMongo().then(
        () => {
            smsService.handleRequest(event).then(results => {
                db.closeConnection().then(() => {
                    done(null, utils.createLambdaResponse(results))
                    return;
                })

            }).catch(err => {
                db.closeConnection().then(() => {
                    done(null, utils.createLambdaResponse(err))
                    console.log('error', JSON.stringify(err))
                    return;
                })
            });
        }
    ).catch(
        err => {
            console.log('ERROR! => ', err)
            db.closeConnection().then(() => {
                done(null, utils.createLambdaResponse(err));
                console.log('connection error:', JSON.stringify(err))
                return;
            })
        }
    )
}
