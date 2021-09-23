const express = require('express');
const router = express.Router();
const { userController } = require('../controller');
const {
    login
} = userController

router.post('/login?', login);
router.post('/login', login);


module.exports = router;