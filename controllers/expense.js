const ExpenseSchema = require("../models/expenseModel")
const jsonwebtoken = require("jsonwebtoken");


exports.addExpense = async (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).json({ error: "Not Authorized" });
    }

    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const { title, amount, category, description, date } = req.body
    const expense = ExpenseSchema({
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

                expense.save()
                res.status(200).json({ Message: 'Expense Created', expense })
            } catch (error) {

                res.status(500).json({ Message: 'Server Error' })
            }
        }

        else {
            res.status(401).json(err.message)
        }
    })




}

exports.getExpenses = async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "Not Authorized" });
    }

    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    jsonwebtoken.verify(token, process.env.JWT_SECRET, async (err, decoded) => {

        if (decoded) {

            try {
                const expenses = await ExpenseSchema.find({ status: true }).sort({ createdAt: -1 })
                res.status(200).json(expenses)
            } catch (error) {

                res.status(500).json({ Message: 'Server Error' })
            }
        }
        else {
            res.status(401).json(err.message)
        }


    })

}

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;

    jsonwebtoken.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (decoded) {
            ExpenseSchema.findByIdAndUpdate(id, { status: false }).then((result) => {
                res.status(200).json({ Message: 'Expense Deleted', result })
            }).catch((err) => {
                res.status(500).json({ Message: 'Server Error' })
            });
        } else {
            res.status(401).json(err.message)
        }
    })


}