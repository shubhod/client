var args = process.argv.splice(2);1
var http = require('http');


function estimatePi() {
    var n = 10000000, inside = 0, i, x, y;

    for ( i = 0; i < n; i++ ) {
        x = Math.random();
        y = Math.random();
        if ( Math.sqrt(x * x + y * y) <= 1 )
            inside++;
    }

    return 4 * inside / n;
}

// Create a basic server that responds to any request with the pi estimation
var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.end('Pi: ' + estimatePi());
});

// Listen to a specified port, or default to 8000
server.listen(args[0] || 8000);