const router = require('express').Router();
const db = require('../utility/database');
const jwt = require('jsonwebtoken');
const config = require('../config');

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.end();
});

router.get('/ping', (req, res) => {
    const token = req.cookies['token'];
    if (!token) {
        return res.status(401).end();
    }

    const User = db.models.user;
    let decoded = {};
    try {
        decoded = jwt.verify(token, config.jwt.secret);
    } catch (e) {
        res.status(401).end();
    }

    if (!decoded.id) {
        return res.status(401).end();
    }

    User.findOne({
        where: {
            id: decoded.id
        }
    }).then((user) => {
        if (!user) {
            res.status(401).end();
        } else {
            res.end('works');
        }
    });
});

module.exports = router;