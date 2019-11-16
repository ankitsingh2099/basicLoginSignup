const rootPrefix = '../..',
  ServicesBase = require(rootPrefix + '/app/services/Base'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  UserModel = require(rootPrefix + '/models/User'),
  cookieHelper = require(rootPrefix + '/helpers/cookie'),
  httpRequest = require(rootPrefix + '/lib/httpRequest'),
  coreConstants = require(rootPrefix + '/coreConstants'),
  CommonValidators = require(rootPrefix + '/helpers/validators');

class MobileOTPLogin extends ServicesBase{
  constructor(params){
    super(params);
    const oThis = this;
    
    oThis.mobileNumber = params.mobile_number;
    oThis.otp = params.otp;
  }
  
  async _asyncPerform(){
    const oThis = this;
    
    await oThis._validateAndSanitize();
    
    await oThis._fetchUserDetails();
    
    await oThis._verifyOTP();
  
    await oThis._prepareCookieValue();
  
    return {
      success: true,
      code: 200,
      cookieValue: oThis.cookieValue
    }
  }
  
  async _validateAndSanitize() {
    const oThis = this;
    
    if(!CommonValidators.validateMobileNumber(oThis.mobileNumber)){
      return Promise.reject({
        success: false,
        code: 422,
        error: 'Invalid Mobile Number'
      })
    }
  
    if(!CommonValidators.validateOTP(oThis.otp)){
      return Promise.reject({
        success: false,
        code: 422,
        error: 'Invalid OTP'
      })
    }
  }
  
  async _fetchUserDetails() {
    const oThis = this;
  
    let dbRow = await UserModel.findOne({ where: {mobile_number: oThis.mobileNumber} });
    
    if(!dbRow){
      return Promise.reject({
        success: false,
        code: 422,
        error: 'Given mobile number does not exist in our system.'
      })
    }
    
    oThis.userDetails = dbRow.dataValues;
  }
  
  async _verifyOTP() {
    const oThis = this;
  
    let options = {
      "method": "POST",
      "hostname": "api.msg91.com",
      "port": null,
      "path": `/api/v5/otp/verify?otp=${oThis.otp}&authkey=${coreConstants.MSG91_AUTH_KEY}&mobile=+91${oThis.mobileNumber}`,
      "headers": {}
    };
    
    let response = await httpRequest.perform(options);
    
    if(!response.responseData || !response.responseData.type || response.responseData.type != "success"){
      return Promise.reject({
        success: false,
        code: 422,
        error: 'Incorrect OTP'
      })
    }
  }
  
  async _prepareCookieValue() {
    const oThis = this;
    
    oThis.cookieValue = cookieHelper.createLoginCookieValue(oThis.userDetails.id);
  }
}

module.exports = MobileOTPLogin;