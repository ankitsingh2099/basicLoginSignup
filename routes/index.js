const express = require('express'),
  router = express.Router(),
  cookieParser = require('cookie-parser');

const rootPrefix = "..",
  UsersController = require(rootPrefix + '/app/controllers/User'),
  coreConstant = require(rootPrefix + '/coreConstants');

router.use(cookieParser(coreConstant.COOKIE_SECRET));
router.get('/signup', UsersController.get);
router.post('/signup', UsersController.post);

router.post('/login',UsersController.login);

module.exports = router;