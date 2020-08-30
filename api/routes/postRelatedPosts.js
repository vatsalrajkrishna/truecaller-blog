var express = require('express');
var router = express.Router();
var get_util = require('../API_Utils/get_util');
var post_util = require('../API_Utils/post_util');


function getPosts(options) {
  return new Promise((resolve, reject) => {
    try {
      get_util(options, function (data) {
        resolve(data);
      });
    } catch (e) {
      reject(e)
    }
  })
}

function get_posts_options(id) {
  return {
    path: `/posts/${id}`,
    params: {
      fields: 'ID,title,date,post_thumbnail,tags'
    }
  }
}

/* GET Related Posts from truecaller blog website. */
router.post('/', function (req, res, next) {
  try {
    const options = {
      path: `/posts/${req.query.id}/related`
    }

    post_util(options, async function (data) {
      const resultArray = [];

      if (data && data.hits && data.hits.length > 0) {

        for (let i = 0; i < data.hits.slice(0, 3).length; i++) {
          let post = await getPosts(get_posts_options(data.hits.slice(0, 3)[i].fields.post_id));
          resultArray.push(post);
        }

        // console.log(resultArray);
      }
      res.send(resultArray);
    });
  } catch (e) {
    res.send({ Error: 'Something Went Wrong' })
  }
});

module.exports = router;
