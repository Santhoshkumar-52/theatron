const router = require('express').Router()
const addnewscreen = require('../controllers/addnewscreen.js')

router.post('/new', addnewscreen)

module.exports = router