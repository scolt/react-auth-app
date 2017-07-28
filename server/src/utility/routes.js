const users = require('../controllers/users');
const auth = require('../controllers/auth');
const router = require('express').Router();

/**
 * All rest api available routes should be initialized here
 * */
router.use('/users', users);
router.use('/auth', auth);

/**
 * Handler for not found route
 */
router.use((req, res) => {
    res.status(404).send('Sorry cant find that!');
});

module.exports = router;
