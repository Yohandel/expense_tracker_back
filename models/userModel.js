const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLenght: 100
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLenght: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        maxLenght: 100
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxLenght: 50
    },
    type: {
        type: String,
        required: true,
        trim: true,
        maxLenght: 50,
        dafault:'user'
    },
    birthday: {
        type: Date,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema)