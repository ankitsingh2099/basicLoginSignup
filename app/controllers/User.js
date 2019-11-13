const rootPrefix = '../..',
  cookieHelper = require(rootPrefix + '/helpers/cookie');

exports.get = function(req, res) {
  const StockList = require(rootPrefix + '/app/services/Stock/list');
  let stockListObj =  new StockList();
  
  stockListObj.perform().then(function(rsp){
    if(!rsp){
      res.status(500).json({});
    } else {
      if(rsp.error){
        res.status(rsp.code).json(rsp);
      } else {
        res.status(200).json(rsp);
      }
    }
  });
};

exports.post = function (req, res) {
  const SignupService = require(rootPrefix + '/app/services/Signup');
  let signup = new SignupService(req.body);
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
}