// Create web server
// Load the http module to create an http server.
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var comments = require('./comments');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    console.log('request starting...');

    var uri = url.parse(request.url).pathname
        , filename = path.join(process.cwd(), uri);

    if (request.method === 'GET' && uri === '/comments') {
        comments.getComments(request, response);
        return;
    }

    if (request.method === 'POST' && uri === '/comments') {
        comments.addComment(request, response);
        return;
    }

    fs.exists(filename, function (exists) {
        if (!exists) {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('404 Not Found\n');
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, 'binary', function (err, file) {
            if (err) {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.write(err + '\n');
                response.end();
                return;
            }

            response.writeHead(200);
            response.write(file, 'binary');
            response.end();
        });
    });
});

// Listen on port 8000, IP defaults to