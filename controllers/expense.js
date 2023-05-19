const ExpenseSchema = require("../models/expenseModel")


exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body
    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        if (!title || !amount || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: 'Amount must ve a positive number' })
        }

        expense.save()
        res.status(200).json({ Message: 'Expense Created', expense })
    } catch (error) {

        res.status(500).json({ Message: 'Server Error' })
    }
}

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 })
        res.status(200).json(expenses)
    } catch (error) {

        res.status(500).json({ Message: 'Server Error' })
    }
}

exports.deleteExpense = async (req, res) => {

    const {id} =  req.params;
    ExpenseSchema.findByIdAndDelete(id).then((result) => {
        res.status(200).json({ Message: 'Expense Deleted', result })
    }).catch((err) => {
        res.status(500).json({ Message: 'Server Error' })
    });
}