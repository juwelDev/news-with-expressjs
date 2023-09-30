var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://express22:L40cMsDF3b6nlB8r@expressdb.r5mgw3d.mongodb.net/expressdb?retryWrites=true&w=majority');

var mongoosedb = module.exports = mongoose;

