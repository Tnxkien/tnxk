const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: {type: String, require: true, unique: true},
    id_user: {type: mongoose.Types.ObjectId, default: null},
    status: {type: Boolean, default: false},
    date_created: {type: Date, default: Date.now()}
})

module.exports = mongoose.model('token', tokenSchema);