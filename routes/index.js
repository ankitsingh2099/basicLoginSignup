const express = require('express'),
  router = express.Router(),
  cookieParser = require('cookie-parser');

const rootPrefix = "..",
  UsersController = require(rootPrefix + '/app/controllers/User'),
  coreConstant = require(rootPrefix + '/coreConstants');

router.use(cookieParser(coreConstant.COOKIE_SECRET));

router.get('/',UsersController.signupPage);
router.post('/sign-up', UsersController.signup);

router.get('/login',UsersController.loginpage);
router.post('/login',UsersController.login);

router.post('/generate-otp', UsersController.generateOtp);

router.get('/success', UsersController.successPage);

module.exports = router;