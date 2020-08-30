var express = require('express');
var router = express.Router();
var util = require('../API_Utils/get_util');

/* GET Posts from truecaller blog website. */
router.get('/', function (req, res, next) {
  try {
    const options = {
      path: '/posts',
      params: {
        fields: 'ID,title,date,URL,excerpt,status,post_thumbnail,tags',
        page: req.query && req.query.page && Number(req.query.page) > 0 ? Number(req.query.page) : 1,
        number: 25
      }
    }
    if (req && req.query && req.query.category) {
      options.params.category = req.query.category;
    }
    if (req && req.query && req.query.tag) {
      options.params.tag = req.query.tag;
    }

    util(options, function (data) {
      res.send(data);
    });
  } catch (e) {
    res.send({ Error: 'Something Went Wrong' })
  }
});

module.exports = router;
