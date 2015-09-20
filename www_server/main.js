var http = require('http');
var querystring = require('querystring');
var jwt = require('jwt-simple');
var fileSystem = require('fs');
var path = require('path');
var ext = require('./Content/Common/ext.js');
var tokenSecret = '1234567890';

http.createServer(function (req, res) {
	console.log('Got request.');
	if(!req.url){
		return res.writeHead(400);
	}

    try{
        var filePath = path.join(__dirname, 'Content', req.url);
        var stat = fileSystem.statSync(filePath);
    
        res.writeHead(200, {
            'Content-Type': ext.ext.getContentType(ext.ext.getExt(filePath)),
            'Content-Length': stat.size
        });
        
        var readStream = fileSystem.createReadStream(filePath);
        readStream.pipe(res);
    }catch(err){
        console.warn('Could not load file: ' + filePath);
        return res.writeHead(401);
    }
    
}).listen(8082, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8082/.');