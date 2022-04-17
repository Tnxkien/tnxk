const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    slug: String,
    id_parent: {type: String, default: ""},
    id_user: {type: mongoose.Types.ObjectId, default: null},
    price: {type: Number, default: 0},
    img: {type: Array},
    content: {type: String, default: ''},
    status: {type: Boolean, default: false},
    trash: {type: Boolean, default: false},
    date_created: {type: Date, default: Date.now()},
    date_updated: {type: Date, default: null}
})

module.exports = mongoose.model('product', productSchema);