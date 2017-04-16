/**
 * 创建数据库
 */
-- create database shorturl default character set utf8 collate utf8_general_ci;

-- use shorturl;

/*建表*/
create table map_shorturl (
	id 		int(20)  	not null  	auto_increment,
	shorturl 	varchar(50) 	not null,
	longurl  	varchar(255)  	not null,
	state 	int(3) 		not null,
	primary key(id)
)engine=innoDB default charset=utf8 auto_increment=1;