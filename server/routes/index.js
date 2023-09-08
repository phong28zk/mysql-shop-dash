const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const AddressController = require('../controllers/data/address.controller');
const ErrorHandler = require('../middleware/error.middleware');
const AuthGuard = require('../middleware/auth.middleware');
const schema = require('../validations/auth.validation');
const validate = require('../utils/validator.util'); 

router.post('/register',    validate(schema.register), ErrorHandler(AuthController.register));
router.post('/login',       validate(schema.login),    ErrorHandler(AuthController.login));
router.get('/user',         AuthGuard,                 ErrorHandler(AuthController.getUser));
router.get('/logout',       AuthGuard,                 ErrorHandler(AuthController.logout));
router.post('/refresh',     validate(schema.refresh),  ErrorHandler(AuthController.refreshToken));

router.get('/addresses',    AuthGuard,                 ErrorHandler(AddressController.getAllAddress));
// router.get('/address/:id',  AuthGuard,                 ErrorHandler(AddressController.getAddress));


router.all('*',  (req, res) => res.status(400).json({ message: 'Bad Request.'}))

module.exports = router;
