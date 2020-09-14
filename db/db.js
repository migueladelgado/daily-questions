const mongoose = require('mongoose');

//connect to mongo
const connectToMongo = async () => {
    return mongoose.connect(
        process.env.DB_CONN_URI,
        { useNewUrlParser : true }
    );
}

module.exports = connectToMongo;