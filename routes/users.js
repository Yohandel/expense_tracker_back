const { addUser, getUsers, deleteUser } = require('../controllers/user')
const { authenticateToken } = require('../middlewares/authMiddleware')

const router = require('express').Router()

router.post('/add-user', authenticateToken, addUser)
    .get('/get-users', authenticateToken, getUsers)
    .delete('/delete-user/:id', authenticateToken, deleteUser)

module.exports = router