var express = require('express');
var router = express.Router();
var ShortUrl = require('../service/ShortUrl');

router.use(function(req, res, next){
    if(req.url !== ''){
        ShortUrl.getLongUrl(req.url.replace(/\//g, ''), function(data){
            console.log(data.longurl);
            res.redirect(301, data.longurl);
        })
    }
})

module.exports = router;