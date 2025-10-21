const db = require('../config/db.js')
const jwt = require("jsonwebtoken");
const env = require('dotenv').config('../.env')



const checkLogin = (req, res) => {
    const { userid, password } = req.body;

    const query = 'SELECT *,(SELECT staffname FROM staffmaster WHERE staffid=lm.staffid)AS staffname  FROM loginmaster lm WHERE lm.userid=? AND lm.password = ?';

    db.query(query, [userid, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error" });
        }

        if (result.length > 0) {
            const secretKey = process.env.SECRETKEY;
            const token = jwt.sign(result[0], secretKey, { expiresIn: '24h' })
            // User found → send user details
            return res.json({ icon: 'success', 'message': `Welcome ${result[0].staffname}`, token }); // sends all user columns
        } else {
            // User not found → send error
            return res.status(200).json({ icon: 'error', message: "Invalid User ID or Password" });
        }
    });
};

module.exports = checkLogin