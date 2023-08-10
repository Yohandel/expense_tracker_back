const { login, refresh, logout } = require('../controllers/auth')

const router = require('express').Router()

router.post('/login', login)
.get('/auth/refresh', refresh)
.post('/logout', logout)

module.exports  = router