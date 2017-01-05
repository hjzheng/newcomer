'use strict';
let express = require('express');
let router = express.Router();

let areas = require('./areas');

areas(router, '/areas');

module.exports = router;
