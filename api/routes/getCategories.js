var express = require('express');
var router = express.Router();
var util = require('../API_Utils/get_util');

/* GET Catgegories from truecaller blog website. */
router.get('/', function (req, res, next) {
  try {
    const options = {
      path: '/categories',
      params: {
        fields: 'ID,name,slug'
      }
    }

    util(options, function (data) {
      res.send(data && data.categories);
    });
  } catch (e) {
    res.send({Error: 'Something Went Wrong'})
  }
});

module.exports = router;
