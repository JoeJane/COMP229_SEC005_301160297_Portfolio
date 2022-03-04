// require modules for the BusinessContact Model
let mongoose = require('mongoose');

// create a business contact model class
let businessContactModel = mongoose.Schema({
    name: String,
    contactNumber: String,
    email: String
}, {
    collection: "businessContacts"
});

module.exports = mongoose.model('BusinessContact', businessContactModel);