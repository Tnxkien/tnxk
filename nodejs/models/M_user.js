const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, default: ''},
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true, default: ''},
    email: String,
    phone: String,
    avatar: {type: String, default: ''},
    role: {type: String, default: 'user'},
    status: {type: Boolean, default: true},
    trash: {type: Boolean, default: true},
    date_created: {type: Date, default: Date.now()},
    date_updated: {type: Date, default: null}
})

userSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('user', userSchema);