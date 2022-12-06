const mongoose = require('mongoose');

const connect = mongoose.connect(process.env.DB_URL);

module.exports = connect;
