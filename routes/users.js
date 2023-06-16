const { addUser, getUsers, deleteUser } = require('../controllers/user')

const router = require('express').Router()

router.post('/add-user', addUser)
.get('/get-users', getUsers)
.delete('/delete-user/:id', deleteUser)

module.exports  = router