const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 30,
        trim: true
    },
    lastName: {
        type: String,
        maxlength: 30,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default: "USER",
        uppercase: true,
        enum:["USER", "ADMIN", "SUPER-ADMIN"]
    },
    accessToken: {
        type: String
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;