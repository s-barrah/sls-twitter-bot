import Twitter from 'twitter';

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

/**
 * LoggerService class
 */
export default class TwitterService {
  constructor() {

  }

  search(params) {
    return new Promise((resolve, reject) => {
      client.get('search/tweets', params, function(err, data) {
        if(!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  }

  favourite(id) {
    return new Promise((resolve, reject) => {
      client.get('favorites/create', id, function(err, data) {
        if(!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  }
}
