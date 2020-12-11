const mongoose = require("mongoose");

//  default roles - 'buyer' or 'seller'

const userSchema = new mongoose.Schema( {
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    address: {type: mongoose.Schema.Types.Mixed, required: true},
    phone: {type: mongoose.Schema.Types.Mixed, required: true},
    role: {type: [String], required: true},
    password: {type: String, required: true}
})

module.exports =  mongoose.model('users', userSchema);