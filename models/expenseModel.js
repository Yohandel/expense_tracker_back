const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
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
        default: 'expense'
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
    status: {
        type: Boolean,
        default: true,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Expense', ExpenseSchema)