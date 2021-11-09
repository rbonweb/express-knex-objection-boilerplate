const jwt = require('jsonwebtoken');
const { encrypt, decrypt } = require('./CommonHelper');

exports.generateAccessToken = function (authData) {
    return jwt.sign(encrypt(authData.toString()), process.env.JWT_TOKEN_SECRET);
};

exports.authenticateToken = function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, authData) => {
        if (err) return res.sendStatus(403);
        req.authData = decrypt(authData);
        next();
    })
}