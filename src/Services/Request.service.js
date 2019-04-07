import QueryString from 'querystring';
import validate from "validate.js";
import ResponseService from "./Response.service";

const constraints = require('../Constraints/search.constraints.json');

export const REQUEST_TYPES = {
  GET: 'GET',
  POST: 'POST',
};

/**
 * RequestService class
 */
class RequestService {

  /**
   * RequestService constructor
   * @param event object
   */
  constructor(event) {
    this.event = event;
  }

  /**
   * Get a parameter from the request.
   * @param param
   * @param ifNull
   * @param requestType
   * @return {*}
   */
  get(param, ifNull = null, requestType = null) {
    // If the request has a GET method or the request type is set as get then fetch parameter from GET
    if (this.event.httpMethod === 'GET' || requestType === REQUEST_TYPES.GET) {
      return typeof this.event.queryStringParameters !== 'undefined' &&
      this.event.queryStringParameters !== null &&
      typeof this.event.queryStringParameters[param] !== 'undefined'
        ? this.event.queryStringParameters[param] : ifNull;
    }

    // If the request has a POST method or the request type is set as get then fetch parameter from POST
    if (this.event.httpMethod === 'POST' || requestType === REQUEST_TYPES.POST) {
      let queryParams = {};

      if ((typeof this.event.headers['Content-Type'] !== 'undefined' && this.event.headers['Content-Type'].indexOf('application/x-www-form-urlencoded') !== -1)
        || (typeof this.event.headers['content-Type'] !== 'undefined' && this.event.headers['content-Type'].indexOf('application/x-www-form-urlencoded') !== -1)) {
        queryParams = QueryString.parse(this.event.body);
      }

      if ((typeof this.event.headers['Content-Type'] !== 'undefined' && this.event.headers['Content-Type'].indexOf('application/json') !== -1)
        || (typeof this.event.headers['content-Type'] !== 'undefined' && this.event.headers['content-Type'].indexOf('application/json') !== -1)) {
        queryParams = JSON.parse(this.event.body);
      }

      return typeof queryParams[param] !== 'undefined' ? queryParams[param] : ifNull;
    }

    return null;
  }

  /**
   * Get all request parameters
   * @param requestType
   * @return {{}}
   */
  getAll(requestType = null) {
    if (this.event.httpMethod === 'GET' || requestType === REQUEST_TYPES.GET) {
      return typeof this.event.queryStringParameters !== 'undefined' ?
        this.event.queryStringParameters : {};
    }

    if (this.event.httpMethod === 'POST' || requestType === REQUEST_TYPES.POST) {
      let queryParams = {};

      if ((typeof this.event.headers['Content-Type'] !== 'undefined' && this.event.headers['Content-Type'].indexOf('application/x-www-form-urlencoded') !== -1)
        || (typeof this.event.headers['content-type'] !== 'undefined' && this.event.headers['content-type'].indexOf('application/x-www-form-urlencoded') !== -1)) {
        queryParams = QueryString.parse(this.event.body);
      }

      if ((typeof this.event.headers['Content-Type'] !== 'undefined' && this.event.headers['Content-Type'].indexOf('application/json') !== -1)
        || (typeof this.event.headers['content-type'] !== 'undefined' && this.event.headers['content-type'].indexOf('application/json') !== -1)) {
        queryParams = JSON.parse(this.event.body);
      }

      return typeof queryParams !== 'undefined' ? queryParams : {};
    }

    return null;
  }

  /**
   * Validate form variables
   * @type {function(RequestService, object)}
   */
  validateAgainstConstraints(request) {
    return new Promise((resolve, reject) => {
      const validation = validate(request, constraints);

      if (typeof validation === 'undefined') {
        resolve();
      } else {
        const response = new ResponseService({}, 500, 'required fields are missing');
        response.setBodyVariable('validation_errors', validation);
        reject(response);
      }
    });
  }

}

export default RequestService;
