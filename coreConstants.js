/**
 * Class for core constants.
 *
 * @class CoreConstants
 */
class CoreConstants {
  get environment() {
    return process.env.WP_ENVIRONMENT;
  }
  
  get APP_NAME() {
    return process.env.SA_APP_NAME;
  }
}

module.exports = new CoreConstants();
