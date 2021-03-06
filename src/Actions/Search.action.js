import Raven from 'raven';
import RavenLambdaWrapper from 'serverless-sentry-lib';
import validate from 'validate.js/validate';

import ResponseService from '../Services/Response.service';
import RequestService from '../Services/Request.service';
import LoggerService from '../Services/Logger.service';
import TwitterService from '../Services/Twitter.service';

import SearchModel from '../Model/Search.model';

const constraints = require('../Constraints/search.constraints.json');


export default RavenLambdaWrapper.handler(Raven, (event, context) => {
  if (typeof event['detail-type'] !== 'undefined' && event['detail-type'] === 'Scheduled Event') {
    return context.done(null, {});
  }

  const Logger = new LoggerService();
  const Twitter = new TwitterService();

  const Request = new RequestService(event);
  let response = {};

  // store search model
  const searchModel = new SearchModel().hydrateFromEntity(Request.getAll());
  let data = searchModel.getEntityMappings();

  Request.validateAgainstConstraints(data)
    .then(() => {
      return Twitter.search(data);
    })
    .then((results) => {
      response = new ResponseService({results}, 200, 'Twitter search has been processed');
    })
    .catch((error) => {
      Logger.error(error);
      console.log(error);
      response = (error instanceof ResponseService) ? error : new ResponseService({}, 500, 'unknown error');
    })
    .then(() => {
      context.done(null, response.generate());
    });

});





