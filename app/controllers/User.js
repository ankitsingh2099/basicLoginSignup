const rootPrefix = '../..',
  cookieHelper = require(rootPrefix + '/helpers/cookie');

exports.signupPage = function(req, res) {
  res.sendFile('/index.html', {root: `${__dirname}${rootPrefix}/../view`});
};

exports.signup = function (req, res) {
  const SignupService = require(rootPrefix + '/app/services/Signup');
  let signup = new SignupService(req.body);
  console.log('--req.body--',req.body);
  signup.perform().then(function(rsp){
    if(!rsp){
      res.status(500).json({});
    } else {
      if(rsp.success){
        cookieHelper.setLoginCookie(res,rsp.cookieValue);
        res.status(200).json({success: true});
        res.send();
      } else {
        res.status(rsp.code).json(rsp);
      }
    }
  });
};

exports.login = function (req, res) {
  const LoginFactory = require(rootPrefix + '/app/services/LoginFactory');
  LoginFactory.provide(req.body).then(function(rsp){
    if(!rsp){
      res.status(500).json({});
    } else {
      if(rsp.success){
        cookieHelper.setLoginCookie(res,rsp.cookieValue);
        res.status(200).json({success: true});
        res.send();
      } else {
        res.status(rsp.code).json(rsp);
      }
    }
  });
};

exports.loginpage = function(req, res) {
  if(req.query.type == 'email'){
    res.sendFile('/email_login.html', {root: `${__dirname}${rootPrefix}/../view`});
  } else {
    res.sendFile('/mobile_login.html', {root: `${__dirname}${rootPrefix}/../view`});
  }
};

exports.generateOtp = function(req, res) {
  const GenerateOTP = require(rootPrefix + '/app/services/GenerateOTP');
  let generateOtp = new GenerateOTP(req.query);
  generateOtp.perform().then(function(rsp){
    if(!rsp){
      res.status(500).json({});
    } else {
      if(rsp.success){
        res.status(200).json({success: true});
        res.send();
      } else {
        res.status(rsp.code || 500).json(rsp);
      }
    }
  });
};

exports.successPage = function(req, res) {
  res.sendFile('/success.html', {root: `${__dirname}${rootPrefix}/../view`});
};