const rootPrefix = '../..',
  ServicesBase = require(rootPrefix + '/app/services/Base'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  UserModel = require(rootPrefix + '/models/User'),
  cookieHelper = require(rootPrefix + '/helpers/cookie'),
  httpRequest = require(rootPrefix + '/lib/httpRequest'),
  coreConstants = require(rootPrefix + '/coreConstants'),
  CommonValidators = require(rootPrefix + '/helpers/validators');

class GenerateOTP extends ServicesBase{
  constructor(params){
    super(params);
    const oThis = this;
    
    oThis.mobileNumber = params.mobile_number;
  }
  
  async _asyncPerform(){
    const oThis = this;
    
    await oThis._validateAndSanitize();
    
    await oThis._fetchUserDetails();
    
    await oThis._generateOTP();
    
    return {
      success: true,
      code: 200
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
  
  async _generateOTP() {
    const oThis = this;
    
    let options = {
      "method": "POST",
      "hostname": "api.msg91.com",
      "port": null,
      "path": `/api/v5/otp?authkey=${coreConstants.MSG91_AUTH_KEY}&mobile=+91${oThis.mobileNumber}&template_id=${coreConstants.MSG91_OTP_TEMPLATE}&otp_length=6`,
      "headers": {
        "content-type": "application/json"
      }
    };
    
    let response = await httpRequest.perform(options);
    
    if(!response.responseData){
      return Promise.reject({
        success: false,
        code: 500,
        error: 'Generate OTP failed'
      })
    }
  
    let responseData = null;
    try {
      responseData = JSON.parse(response.responseData)
    } catch(err){
      console.error('Error: ',err);
      return Promise.reject({
        success: false,
        code: 500,
        error: 'Generate OTP failed'
      })
    }
    
    if(responseData.type != "success"){
      return Promise.reject({
        success: false,
        code: 500,
        error: 'Generate OTP failed'
      })
    }
  }
}

module.exports = GenerateOTP;