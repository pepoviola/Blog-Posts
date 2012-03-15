http = require('http');

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<p>Hello World</p>');
  res.end();
  console.log('1');
}).listen(8080);
