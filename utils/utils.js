const createLambdaResponse = body => {
    return {
        statusCode: 200,
        body: JSON.stringify(body)
    }
}

module.exports.createLambdaResponse = createLambdaResponse;