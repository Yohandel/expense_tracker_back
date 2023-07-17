const { addExpense, getExpenses, deleteExpense } = require('../controllers/expense')
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income')
const { getDashboard } = require('../controllers/dashboard')

const router = require('express').Router()

router.post('/add-income', addIncome)
.get('/get-incomes', getIncomes)
.delete('/delete-income/:id', deleteIncome)

router.post('/add-expense', addExpense)
.get('/get-expenses', getExpenses)
.delete('/delete-expense/:id', deleteExpense)

router.get('/dashboard', getDashboard)

module.exports  = router