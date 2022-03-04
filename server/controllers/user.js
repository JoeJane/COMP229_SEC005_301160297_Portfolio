// create a reference to the model
let userModel = require('../models/user');
let User = userModel.User;

// find user by username
module.exports.getUserByUsername = function(username, callback) {
    let query = {username: username};
    User.findOne(query, callback);
}
