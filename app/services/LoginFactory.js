const rootPrefix = "../..",
  EmailLogin = require(rootPrefix + '/app/services/Login'),
  MobileOTPLogin = require(rootPrefix + '/app/services/MobileOTPLogin');

class LoginFactory{
  constructor() {
  
  }
  
  static provide(params){
    switch(params.login_type){
      case "OTP": {
        return new MobileOTPLogin(params).perform();
        break;
      }
      case "EMAIL": {
        return new EmailLogin(params).perform();
        break;
      }
    }
  }
}

module.exports = LoginFactory;