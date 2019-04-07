
/**
 *
 * @type {object}
 */
export const RESPONSE_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',       // Required for CORS support to work
  'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
};

/**
 * Default message provided as part of response
 * @type {string}
 */
export const DEFAULT_MESSAGE = 'success';

/**
 * ResponseService
 */
class ResponseService {

  /**
   * ResponseService Constructor
   * @param data
   * @param code
   * @param message
   */
  constructor(data = null, code = null, message = null) {
    this.body = {
      data: data !== null ? data : {},
      message: message !== null ? message : DEFAULT_MESSAGE,
    };
    this.code = code !== null ? code : {};
  }

  /**
   * Add or update a body variable
   * @param variable
   * @param value
   */
  setBodyVariable(variable, value) {
    this.body[variable] = value;
  }

  /**
   * Set Data
   * @param data
   */
  setData(data) {
    this.body.data = data;
  }

  /**
   * Set Status Code
   * @param code
   */
  setCode(code) {
    this.code = code;
  }

  /**
   * Set message
   * @param message
   */
  setMessage(message) {
    this.body.message = message;
  }

  /**
   * Geneate a response
   * @return {object}
   */
  generate() {
    return {
      statusCode: this.code,
      headers: RESPONSE_HEADERS,
      body: JSON.stringify(this.body),
    };
  }
}

export default ResponseService;
