var express = require('express');
var router = express.Router();
var ShortUrl = require('../service/ShortUrl.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '短地址demo' });
});

router.post('/create', function(req, res, next){
	ShortUrl.addShortUrl(decodeURIComponent(req.body.longurl), function(data){
		if(data){
			res.send(data);
		}
	})
})

module.exports = router;