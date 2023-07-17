const ExpenseSchema = require("../models/expenseModel")
const IncomesSchema = require("../models/incomdeModel")

exports.getDashboard = async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "Not Authorized" });
    }

    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    try {
        const expenses = await ExpenseSchema.find({ status: true }).sort({ createdAt: -1 })
        const incomes = await IncomesSchema.find({ status: true }).sort({ createdAt: -1 })
        const metrics = [...expenses, ...incomes]
        res.status(200).json(metrics)
    } catch (error) {

        res.status(500).json({ Message: 'Server Error' })
    }
}