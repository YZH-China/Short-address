var crypto = require('crypto');
var ShortUrl = require('../dao/shorturl_dao.js');

var defaultPrefix = 'http://127.0.0.1:3000/s/'; //默认地址

urlShorten = {

	text: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', /*组成短URL的字符*/
	defaultLength: 6,

	/**
	 * [md5 产生长URL的MD5码]
	 * @param  {[string]} longURL [长URL本身]
	 * @return {[int]}         [128位的MD5码]
	 */
	md5: function(longURL){
		var md5num = crypto.createHash('md5'); /*产生hash对象，用于生成MD5码*/
		md5num.update(longURL, 'utf8'); //生成md5码
		var str = md5num.digest('hex'); //转换为16进制数字
		return str;
	},

	/**
	 * [getShort 获取短地址]
	 * @param  {[string]} longURL [长地址]
	 * @return {[string]}         [短地址]
	 */
	getShort: function(longURL){
		var shortArr = [];
		var md5str = this.md5(longURL);
		
		for(var i = 0; i < 4; i += 1){
			var curStr = md5str.slice(i * 8, i * 8 + 8);
			var shorturl = '';

			curStr = parseInt(curStr, 16);
			curStr &= 0x3FFFFFFF; /*取低30位*/

			for(var j = 0; j < 6; j += 1){
				shorturl += (this.text[curStr & 0x0000003D]);
				curStr >>= 5;
			}

			shortArr.push(shorturl);
		}
		return {
			featureCodes: shortArr,
			md5: md5str
		}
	}

}

// 1.将原始长链接进行MD5加密，为了避免防止算法泄漏，可以在原链接上添加自定义的字符串作为密钥。
// 2.把128位的MD分成四组，每组32位，对应一个候选短链接。
// 3.对于每个32位的数，将它与0x3FFFFFFF进行位与运算，取其低30位的数据。把得到的值与0x0000003D进行位与运算，再把得到的结果作为下标在字符表中选取字符，再把原数字右移5位进行相同操作，重复进行6次得到6个字符，即组成一个候选短链接地址。
// 4.在4个候选短链接中随机选择一个作为最终的短链接，把长短链接映射关系存入数据库中。

module.exports.addShortUrl = function(longurl, callback){
	ShortUrl.addShortUrl({
		FeatureCode: urlShorten.getShort(longurl).featureCodes,
		defaultPrefix: defaultPrefix,
		longurl: longurl,
		md5: urlShorten.getShort(longurl).md5
	}, function(data){
		if(data.length === 1){
			callback(data[0]);
		}
	})
}

module.exports.getLongUrl = function(feature, callback){
	ShortUrl.getLongUrl(feature, function(data){
		if(data.length === 1){
			callback(data[0]);
		}
	})
}

module.exports.defaultPrefix = defaultPrefix;