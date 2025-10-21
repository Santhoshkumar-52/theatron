const router = require('express').Router()
const dotenv = require('dotenv');
const checkLogin = require('../routes/login.js')
const newScreen = require('../routes/newscreen.js')
dotenv.config({ path: '../.env' });

router.post('/login', checkLogin)
router.use('/screen', newScreen)

module.exports = router;