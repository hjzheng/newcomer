// json server 依赖 express 4.x 说白了, 这里的 server 就是 express
// 所以 可以使用 express 的 API 去 mock 后端请求
var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
var bodyParser = require('body-parser');
var mockRouter = require('./mock-router');
var chokidar = require('chokidar').watch('./conf');


// 添加默认的中间件 logger, static, cors and no-cache
server.use(middlewares);

// 解析 body
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
	extended: false
}));

// 自定义请求
server.get('/echo', function(req, res) {
	res.jsonp(req.query);
});

// server.use(function(req, res, next) {
// 	if (req.method === 'POST') {
// 		req.body.createdAt = Date.now();
// 	}
// 	// Continue to JSON Server router
// 	next();
// });

// Mock request from configure
// 自己mock的一定要写在 json router 之前, 要不然不会生效
server.use(mockRouter);

// 使用 JSON Server 通过 JSON 数据自动生成的路由
server.use(router);

chokidar.on('ready', function() {
	chokidar.on('all', function() {
		console.log('Server restarting...');

		Object.keys(require.cache).forEach(function(id) {
			if (/[\/\\]conf[\/\\]/.test(id)) {
				delete require.cache[id];
			}
		});
	});
});

server.listen(3000, function() {
	console.log('JSON Server is running, please visit http://localhost:3000');
});
