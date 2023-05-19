const IncomeSchema = require('../models/incomdeModel')

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body
    const income = IncomeSchema({
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

        income.save()
        res.status(200).json({ Message: 'Income Created', income })
    } catch (error) {

        res.status(500).json({ Message: 'Server Error' })
    }
}

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 })
        res.status(200).json(incomes)
    } catch (error) {

        res.status(500).json({ Message: 'Server Error' })
    }
}

exports.deleteIncome = async (req, res) => {

    const {id} =  req.params;
    IncomeSchema.findByIdAndDelete(id).then((result) => {
        res.status(200).json({ Message: 'Income Deleted', result })
    }).catch((err) => {
        res.status(500).json({ Message: 'Server Error' })
    });
}