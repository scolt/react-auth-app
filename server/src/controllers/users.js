const router = require('express').Router();
const db = require('../utility/database');

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.end();
});

router.get('/ping', (req, res) => {
    const token = req.cookies['token'];
    if (!token) {
        res.status(401).end();
    } else {
        const User = db.models.user;
        User.findOne({
            where: {
                token: token.replace('Bearer ', '')
            }
        }).then((user) => {
            if (!user) {
                res.status(401).end()
            } else {
                res.end('works');
            }
        });
    }
});

module.exports = router;