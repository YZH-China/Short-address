var QueryMethod = require('./database-connect.js');

module.exports.addShortUrl = function(info, callback){
	var obj = {
		shorturl: info.defaultPrefix,
		longurl: info.longurl,
		state: 1
	};
	var sql = 'insert into map_shorturl set ?';
	var sql_feature = 'select feature from map_shorturl where feature=?';
	QueryMethod.query(sql_feature, info.FeatureCode, function(data){
		if(data.length === 0){
			obj.shorturl += info.FeatureCode;
			obj.feature = info.FeatureCode;
			QueryMethod.query(sql, obj, function(data){
				if(data.insertId){
					callback(obj);
				}
			})
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