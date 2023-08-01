const IncomeSchema = require('../models/incomdeModel')
const jsonwebtoken = require("jsonwebtoken");

exports.addIncome = async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "Not Authorized" });
    }

    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const { title, amount, category, description, date } = req.body
    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })

    jsonwebtoken.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (decoded) {
            try {
                if (!title || !amount || !category || !description || !date) {
                    return res.status(400).json({ message: 'All fields are required' })
                }
                if (amount <= 0 || !amount === 'number') {
                    return res.status(400).json({ message: 'Amount must be a positive number' })
                }

                income.save()
                res.status(200).json({ Message: 'Income Created', income })
            } catch (error) {

                res.status(500).json({ Message: 'Server Error' })
            }
        } else {
            res.status(401).json(err.message)
        }
    })




}

exports.getIncomes = async (req, res) => {

    try {
        const incomes = await IncomeSchema.find({ status: true }).sort({ createdAt: -1 })
        res.status(200).json(incomes)
    } catch (err) {
        res.status(500).json({ Message: 'Server Error', error: err })
    }
}

exports.deleteIncome = async (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).json({ error: "Not Authorized" });
    }

    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const { id } = req.params;

    jsonwebtoken.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (decoded) {

            IncomeSchema.findByIdAndUpdate(id, { status: false }).then((result) => {
                res.status(200).json({ Message: 'Income Deleted', result })
            }).catch((err) => {
                res.status(500).json({ Message: 'Server Error' })
            });
        }
        else {
            res.status(401).json(err.message)
        }
    })

}