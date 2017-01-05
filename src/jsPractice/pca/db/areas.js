'use strict';
let connection = require('../common/db/connection');

function search(keyword, limit){
	let sql = `select id, address from (
	
			select p.provinceID as id, concat(p.province) as address 
			from province p 
	
			union all
	
			select c.cityID as id, concat(p.province, ' > ' ,c.city) as address 
			from province p 
			right join city c on p.provinceID = c.fatherID where c.city != '县' & c.city != '市辖区' & c.city != '市'
	
			union all
	
			select a.areaID as id, concat(p.province, ' > ' ,c.city, ' > ' ,a.area) as address 
			from province p 
			right join city c on p.provinceID = c.fatherID 
			right join area a on c.cityID = a.fatherID 
			
			) as addr
			
			where addr.address like '%${keyword}%' limit ${limit}`;

	return connection.createStatement(sql);
}


function city(provinceId) {
	let sql = `select cityID, city from city where fatherID = ${provinceId}`;
	console.log(sql);
	return connection.createStatement(sql);
}

function province(provinceIds) {
	let sql = `select provinceID, province from province where provinceID in (${provinceIds})`;
	return connection.createStatement(sql);
}

function area(cityId) {
	let sql = `select areaID, area from area where fatherID = ${cityId}`;
	return connection.createStatement(sql);
}

module.exports = {
	test: connection.createStatement('SELECT 1'),
	search: search,
	area: area,
	city: city,
	province: province
};
