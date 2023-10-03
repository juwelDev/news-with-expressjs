var mongoose = require('mongoose');
// mongodb+srv://karim45:<password>@expressdb.avedcq4.mongodb.net/
mongoose.connect('mongodb+srv://karim45:<password>@expressdb.avedcq4.mongodb.net/expressdb?retryWrites=true&w=majority');

var mongoosedb = module.exports = mongoose;