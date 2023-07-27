const { addExpense, getExpenses, deleteExpense } = require('../controllers/expense')
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income')
const { getDashboard } = require('../controllers/dashboard')
const { authenticateToken } = require('../middlewares/authMiddleware')


const router = require('express').Router()

router.post('/add-income', authenticateToken, addIncome)
    .get('/get-incomes', authenticateToken, getIncomes)
    .delete('/delete-income/:id', authenticateToken, deleteIncome)

router.post('/add-expense', authenticateToken, addExpense)
    .get('/get-expenses', authenticateToken, getExpenses)
    .delete('/delete-expense/:id', authenticateToken, deleteExpense)

router.get('/dashboard', authenticateToken, getDashboard)

module.exports = router
