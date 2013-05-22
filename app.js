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

module.exports.app = app;
