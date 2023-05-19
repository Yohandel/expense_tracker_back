const mongoose = require('mongoose');

const IncomdeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLenght: 50
    },

    amount: {
        type: Number,
        required: true,
        maxLenght: 20,
        trim: true
    },
    type: {
        type: String,
        default: 'income'
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLenght: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Income', IncomdeSchema)