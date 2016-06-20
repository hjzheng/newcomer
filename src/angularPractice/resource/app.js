var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var router = express.Router();
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static('public'));

var users = [
	{id: 1, name: 'hjzheng', grade: 88},
	{id: 2, name: 'King', grade: 48},
	{id: 3, name: 'Sandy', grade: 98},
	{id: 4, name: 'Andy', grade: 78},
	{id: 5, name: 'Yun', grade: 92}
];

// mock 一个 RESTful
router
	.get('/users/:id', function(req, res, next) {
		if (req.params.id) {
			res.json(_.find(users, { 'id': parseInt(req.params.id, 10)}));
		}
	})
	.get('/users', function(req, res, next) {
		res.json(users);
	})
	.put('/users/:id', function(req, res, next) {
		var user = _.find(users, { 'id': parseInt(req.params.id, 10)});
		_.merge(user, req.body);
		res.json({success: true});
	})
	.post('/users', function(req, res, next) {
		req.body.id = users.length + 1;
		users.push(req.body);
		res.json({success: true});
	})
	.delete('/users/:id', function(req, res, next) {
		_.remove(users, function(u) {
			return u.id === parseInt(req.params.id, 10);
		});
		res.json({success: true});
	});

app.use(router);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.listen(3000, 'localhost', function(err) {
	if (err) {
		console.log(err);
		return;
	}
	console.log('Listening at http://localhost:3000');
});
