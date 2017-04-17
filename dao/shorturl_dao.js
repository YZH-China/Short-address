var QueryMethod = require('./database-connect.js');

module.exports.addShortUrl = function(info, callback){
	var obj = {
		shorturl: info.defaultPrefix,
		longurl: info.longurl,
		state: 1,
		md5: info.md5
	};
	var loopmark = true; /*检测是否是第一次符合的特征值*/
	var sql = 'insert into map_shorturl set ?';
	var sql_md5 = 'select * from map_shorturl where md5=?';
	var sql_feature = 'select feature from map_shorturl where feature=?';
	/**
	 * 判断改longurl是否已经保存过，通过MD5字符串，若已存在则返回已存在的，若不存在则插入并返回
	 * 在插入前还有检查特征码是否已存在，若存在则用下一条，若不存在则直接插入
	 */
	QueryMethod.query(sql_md5, info.md5, function(data){
		if(data.length === 0){
			for(let i = 0; i < info.FeatureCode.length; i += 1){
				QueryMethod.query(sql_feature, info.FeatureCode[i], function(data){
					if(data.length === 0 && loopmark){
						obj.feature = info.FeatureCode[i];
						obj.shorturl += info.FeatureCode[i];
						loopmark = false;
						QueryMethod.query(sql, obj, function(data){
							if(data.insertId){
								callback(obj);
							}
						})
					}
				})
			}
		} else {
			callback(data);
		}
	})
};

module.exports.getLongUrl = function(feature, callback){
	var sql = 'select longurl from map_shorturl where feature=? and state=1';
	QueryMethod.query(sql, feature, function(data){
		if(data.length !== 0){
			callback(data);
		}
	})
}