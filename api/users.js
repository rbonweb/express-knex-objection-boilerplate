const express = require('express')
const router = express.Router()

const User = require('../models/User')

/* GET users listing. */
router.get('/', function (req, res, next) {
    User.query()
        .then(users => {
            res.json(users)
        })
});

router.get('/:id', (req, res, next) => {
    let id = parseInt(req.params.id)
    User.query()
        .where('id', id)
        .eager('messages')
        .then(user => {
            res.json(user)
        })
})

module.exports = router;