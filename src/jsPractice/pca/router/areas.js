'use strict';
let area = require('../db/areas');

function areaRouter(router, basePath) {

	router.get(basePath + '/', (req, res, next) => {
		area.test.then(data => {
			res.send(data);
		}).fail(err => {
			res.status(500).send({ error: err });
		});
	});

	router.get(basePath + '/search', (req, res, next) => {
		area.search(req.query.keyword, req.query.limit).then(data => {
			res.send(data);
		}).fail(err => {
			res.status(500).send({ error: err });
		});
	});

	router.get(basePath + '/province', (req, res, next) => {
		area.province(req.query.provinceIds).then(data => {
			res.send(data);
		}).fail(err => {
			res.status(500).send({ error: err });
		});
	});

	router.get(basePath + '/city', (req, res, next) => {
		area.city(req.query.provinceId).then(data => {
			res.send(data);
		}).fail(err => {
			res.status(500).send({ error: err });
		});
	});

	router.get(basePath + '/area', (req, res, next) => {
		area.area(req.query.cityId).then(data => {
			res.send(data);
		}).fail(err => {
			res.status(500).send({ error: err });
		});
	});
}

module.exports = areaRouter;
