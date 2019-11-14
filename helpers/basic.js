const rootPrefix = '..',
  coreConstants = require(rootPrefix + '/coreConstants');

const crypto = require('crypto');

class BasicHelper {
  /**
   * Log date format.
   *
   * @returns {string}
   */
  logDateFormat() {
    const date = new Date();
    
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDate() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds() +
      '.' +
      date.getMilliseconds()
    );
  }
  
  /**
   * generate random string
   *
   * @param length
   * @returns {Promise<string>}
   * @private
   */
  async _generateRandomString(length) {
    const oThis = this;
    
    return crypto.randomBytes(Math.ceil(length/2))
      .toString('hex') /** convert to hexadecimal format */
      .slice(0,length);
  }
  
  /**
   * Create MD5.
   *
   * @param {string} string
   */
  createMd5Digest(string) {
    return crypto.createHash('md5')
      .update(string)
      .digest('hex');
  }
  
  /**
   * Invert JSON.
   *
   * @param {object} obj
   *
   * @returns {object}
   */
  invert(obj) {
    const ret = {};
    
    for (const key in obj) {
      ret[obj[key]] = key;
    }
    
    return ret;
  }
  
  isProduction() {
    return coreConstants.environment === 'production';
  }
}

module.exports = new BasicHelper();