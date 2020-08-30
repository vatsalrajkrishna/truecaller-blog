var express = require('express');
var router = express.Router();
var util = require('../API_Utils/get_util');

/* GET Post from truecaller blog website. */
router.get('/', function (req, res, next) {
  try {
    const options = {
      path: `/posts/${req.query.id}`,
      params: {
        fields: 'ID,title,date,URL,content,status,post_thumbnail,tags'
      }
    }

    util(options, function (data) {
      res.send(data);
    });
  } catch (e) {
    res.send({Error: 'Something Went Wrong'})
  }
});

module.exports = router;
