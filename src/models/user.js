const mongoose = require("mongoose");

//  default roles - 'buyer' or 'seller'

const userSchema = new mongoose.Schema( {
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    joined: {type: Date, required: true, default: Date.now()},
    email: {type: String, required: true, unique: true},
    address: {type: mongoose.Schema.Types.Mixed, required: true},
    phone: {type: mongoose.Schema.Types.Mixed, required: true},
    role: {type: [String], required: true},
    password: {type: String, required: true},
    cart: {
        group: {type: String, required: true, default: "products"},
        items: {type: [mongoose.Schema.Types.ObjectId], required: false },
        required: false

    }
})

module.exports =  mongoose.model('users', userSchema);