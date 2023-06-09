const IncomeSchema = require('../models/incomdeModel')
const jsonwebtoken = require("jsonwebtoken");

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
    // if (!req.headers.authorization) {
    //     return res.status(401).json({ error: "Not Authorized" });
    // }

    // const authHeader = req.headers.authorization;
    // const token = authHeader.split(" ")[1];

    // const {name} = jsonwebtoken.verify(token, process.env.JWT_SECRET)


    try {
        const incomes = await IncomeSchema.find({ status: true }).sort({ createdAt: -1 })
        res.status(200).json(incomes)
    } catch (err) {
        res.status(500).json({ Message: 'Server Error', error: err })
    }

}

exports.deleteIncome = async (req, res) => {

    const { id } = req.params;
    IncomeSchema.findByIdAndUpdate(id, { status: false }).then((result) => {
        res.status(200).json({ Message: 'Income Deleted', result })
    }).catch((err) => {
        res.status(500).json({ Message: 'Server Error' })
    });
}