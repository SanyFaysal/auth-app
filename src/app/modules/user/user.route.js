const express = require('express');
const { signup, getAllUsers, login } = require('./user.controller');
const { verifyToken } = require('../../middlewares/verifyToken');
const { auth } = require('../../middlewares/auth');
const router = express.Router();

// for all
router.post('/signup', signup);
router.post('/login', login);


// admin
router.get('/all', verifyToken, auth("admin"), getAllUsers);

//user & admin
router.get('/:id', verifyToken, auth('admin', 'user'), getAllUsers);

exports.userRoutes = router;