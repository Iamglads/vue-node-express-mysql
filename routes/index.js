const express = require('express')

const router = express.Router()

const controller = require('../controller/index')
const userMiddleware = require('../middlewares/users')


router.post('/signup', userMiddleware.validateRegister, controller.signup)
router.post('/login', controller.login)
router.get('/secret-route', userMiddleware.isLoggedIn, controller.login)


module.exports = router()