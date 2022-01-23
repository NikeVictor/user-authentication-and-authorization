const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require ('../middleware/Authenticate');
const authorize = require ('../middleware/authorize');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/users', authenticate, authorize(["ADMIN", "SUPER-ADMIN"]), userController.getUsers);
router.get('/user/:userId', authenticate, userController.getUser);
router.put('/user/:userId', authenticate, authorize(["SUPER-ADMIN"]), userController.updateUser);
router.delete('/user/:userId', authenticate, authorize(["SUPER-ADMIN"]), userController.deleteUser);


module.exports = router;