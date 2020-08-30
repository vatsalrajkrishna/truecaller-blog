var https = require('https');

module.exports = function makeGetRequest(opt, callBack) {
    let reqUrl = 'https://public-api.wordpress.com/rest/v1.1/sites/107403796';
    if (opt && opt.path) {
      reqUrl += opt.path;
    }
    if (opt && Object.keys(opt.params) && Object.keys(opt.params).length > 0) {
      Object.keys(opt.params).forEach(function (key, i) {
        reqUrl += `${i === 0 ? '?' : '&'}${key}=${opt.params[key]}`
      })
    }

    console.log(reqUrl);
    
    https.get(reqUrl, (resp) => {
      let data = '';
  
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });
  
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        callBack(JSON.parse(data))
      });
  
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
  }