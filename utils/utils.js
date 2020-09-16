const createLambdaResponse = body => {
    return {
        statusCode: 200,
        body: JSON.stringify(body)
    }
}

const isValidLambdaRequest = request => {
    if(request && request.httpMethod === 'POST'){
        let body = JSON.parse(request.body);
        if(body.SUPER_SECRET_KEY === process.env.SUPER_SECRET_KEY){
            return true;
        }
    }

    if(request && request.httpMethod === 'GET'){
        if(request.headers.SUPER_SECRET_KEY === process.env.SUPER_SECRET_KEY){
            return true;
        }
    }
    return false;
}

module.exports.createLambdaResponse = createLambdaResponse;
module.exports.isValidLambdaRequest = isValidLambdaRequest;