const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    userID: String,
    products: Array,
    status: String,
    total: Number
},{timestamps: true} )

module.exports = mongoose.model('order', orderSchema);