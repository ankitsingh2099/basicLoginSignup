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
    return process.env.WP_APP_NAME;
  }
  
  get PA_COOKIE_DOMAIN() {
    return process.env.WP_COOKIE_DOMAIN;
  }
  
  get COOKIE_SECRET() {
    return process.env.WP_COOKIE_SECRET;
  }
}

module.exports = new CoreConstants();
