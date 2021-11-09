const express = require('express')
const router = express.Router()

const User = require('../models/User')

/* GET users listing. */
router.post('/login', function (req, res, next) {
    let { email, password } = req.body;
    User.query()
        .where('email', email)
        .then(user => {
            res.json(user)
        })
});


module.exports = router;