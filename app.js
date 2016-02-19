var http = require("http");
var express = require('express');
var app = express();
var server;

app.use(express.static(__dirname));

app.start = function(serverPort, callback) {
  server = http.createServer(this);
  server.listen(serverPort);
  if (callback)
    callback();
};

app.shutdown = function(callback) {
  server.close(callback);
};

var server = app.listen(Number(process.env.PORT || 8888), function() {
  console.log('NODE_ENV=%s http://%s:%d', app.settings.env, server.address().address, server.address().port);
});
