const rootPrefix = "../..",
  EmailLogin = require(rootPrefix + '/app/services/Login'),
  MobileOTPLogin = require(rootPrefix + '/app/services/MobileOTPLogin');

class LoginFactory{
  constructor() {
  
  }
  
  static async provide(params){
    switch(params.type){
      case "otp": {
        return new MobileOTPLogin(params).perform();
        break;
      }
      case "email": {
        return new EmailLogin(params).perform();
        break;
      }
    }
  }
}

module.exports = LoginFactory;