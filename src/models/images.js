const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    data: {type: Buffer, required: true},
    contentType: {type: String, required: true}
})

module.exports = mongoose.model('images', imageSchema);
