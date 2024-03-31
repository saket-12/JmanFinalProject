const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    role:String,
    phone: String,
    isPasswordSet: {
        type: Boolean,
        default: false
    },
    isApprover : {
        type : Boolean,
        default : false
    },
    madeApproverFor: {
        type: String,
        default: null
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

const User = mongoose.model('User', userSchema);
module.exports = User;