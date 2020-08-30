const request = require("request");

module.exports = function makePostRequest(opt, callBack) {
  let reqUrl = 'https://public-api.wordpress.com/rest/v1.1/sites/107403796';
  if (opt && opt.path) {
    reqUrl += opt.path;
  }
  if (opt && opt.params && Object.keys(opt.params) && Object.keys(opt.params).length > 0) {
    Object.keys(opt.params).forEach(function (key, i) {
      reqUrl += `${i === 0 ? '?' : '&'}${key}=${opt.params[key]}`
    })
  }

  console.log(reqUrl);

  var options = {
    method: 'POST',
    url: reqUrl,
    headers:
    {
      'cache-control': 'no-cache'
    }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    callBack(JSON.parse(body));
  });
}