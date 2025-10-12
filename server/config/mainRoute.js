const router = require('express').Router()
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

router.get('/', (req, res) => {
    res.send(`${process.env.DB_PASSWORD || 0}`)
})

module.exports = router;