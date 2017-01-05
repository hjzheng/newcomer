'use strict';
let path = require('path');
let q = require('q');
let mysql = require('mysql');
let loadYaml = require('../util/loadYaml');

let dbConfig = loadYaml(path.join(__dirname, '../../config/db.yml'));

let connection = mysql.createConnection({
	user: dbConfig.user,
	password: dbConfig.password,
	host: dbConfig.host,
	port: dbConfig.port,
	database: dbConfig.database
});

let createStatement = function(sql) {
	var deferred = q.defer();

	connection.query(sql, (err, rows) => {
		if (err) {
			deferred.reject(err);
		} else {
			deferred.resolve(rows);
		}
	});

	return deferred.promise;
};

module.exports = {
	createStatement: createStatement
};
