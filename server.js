console.log(__dirname);
console.log('Starting server');
const localWebServer = require('local-web-server')
var options = {'static': {'root': 'site'}};

var port = (process.argv.length) >= 3 ? process.argv[2] : 8000;
localWebServer(options).listen(port);
