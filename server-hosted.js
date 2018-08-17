'use strict';

var finalhandler = require('finalhandler'),
    https         = require('https'),
    serveStatic  = require('serve-static'),
    serve,
    server;

serve  = serveStatic(__dirname + '/dist', {index: ['index.html']});


server = https.createServer(function(req, res) {
    var done = finalhandler(req, res);
    serve(req, res, done);
});

module.exports = function(port) {
    console.log('Server is running on port: ' + port);
    return server.listen(port);
};
