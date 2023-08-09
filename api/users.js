const express = require('express')
const router = express.Router()

const User = require('../models/User')
const Joi = require('joi');

/* GET users listing. */
router.get('/', function (req, res, next) {
    User.query()
        .then(users => {
            res.json(users)
        })
});

router.get('/:id', (req, res, next) => {
    let id = parseInt(req.params.id)

    const schema = Joi.object().keys({
        id: Joi.number().integer().min(1),
    });

    const { error } = schema.validate({ id: id });

    if (error) {
        res.status(422).json({
            status: 'error',
            message: error.message
        });
        return;
    }

    User.query()
        .where('id', id)
        .withGraphFetched('messages')
        .then(user => {
            res.json(user)
        })
})

module.exports = router;