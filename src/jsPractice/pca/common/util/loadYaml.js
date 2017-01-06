'use strict';

let yaml = require('js-yaml');
let fs = require('fs');

function loadYaml(file) {

	try {
		var doc = yaml.load(
			fs.readFileSync(file, 'utf8')
		);
	} catch (e) {
		throw new Error('can not get file');
	}

	return doc;
}

module.exports = loadYaml;
