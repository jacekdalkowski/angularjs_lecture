var http = require('http');
var jwt = require('jwt-simple');
var fileSystem = require('fs');
var path = require('path');
var cassandra = require('cassandra-driver');
//var async = require('async');
var tokenSecret = '1234567890';

http.createServer(function (req, res) {
	console.log('Got request for: ' + req.url);
	res.setHeader('Access-Control-Allow-Origin', '*');
	
	if (req.method === 'OPTIONS') {
		console.log('!OPTIONS');
		var headers = {};
		// IE8 does not allow domains to be specified, just the *
		// headers["Access-Control-Allow-Origin"] = req.headers.origin;
		headers["Access-Control-Allow-Origin"] = "*";
		headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
		headers["Access-Control-Allow-Credentials"] = false;
		headers["Access-Control-Max-Age"] = '86400'; // 24 hours
		headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
		res.writeHead(200, headers);
		res.end();
		return;
	}
	
	if(req.url.indexOf('/api/employees') == 0){
		handleEmployeesRequest(req, res);
	}else if(req.url.indexOf('/api/secure/employees') == 0){
		handleSecureEmployeesRequest(req, res);
	}else{
		res.writeHeader(404);
		res.end();
	}
    
}).listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/.');

function handleEmployeesRequest(req, res){
	if(req.method === 'GET'){
		var employeeIdUrlPattern = /api\/employees\/(\d+)/i;
		var employeeIdUrlMatch = req.url.match(employeeIdUrlPattern);
		var employeeId;
		
		var employeeSurnameFilterUrlPattern = /api\/employees\/\?surname=(.*)/i;
		var employeeSurnameFilterUrlMatch = req.url.match(employeeSurnameFilterUrlPattern);
		var employeeSurnameFilter;
		
		if(employeeIdUrlMatch){
			employeeId = employeeIdUrlMatch[1];
			writeQueryResultToResponse('SELECT id, surname, position, salary FROM employees WHERE id=' + employeeId +';', res);
		}else if(employeeSurnameFilterUrlMatch){
			employeeSurnameFilter = decodeURI(employeeSurnameFilterUrlMatch[1]);
			writeQueryResultToResponse('SELECT id, surname, position, salary FROM employees WHERE surname=\'' + employeeSurnameFilter + '\';', res);
		}else if(req.url === '/api/employees/'){
			writeQueryResultToResponse('SELECT id, surname, position, salary FROM employees;', res);
		}else{
			res.writeHead(404);
			res.end();
		}
	}else if(req.method === 'POST'){
		loadBody(req, res, function onBodyLoaded(requestBodyString){
			
				function getRandomIntInclusive(min, max) {
					return Math.floor(Math.random() * (max - min + 1)) + min;
				}
			
				var requestBody = JSON.parse(requestBodyString);
				executeCommnad('insert into employees (id, position, salary, surname) values (' +
								getRandomIntInclusive(1, 99999) + ', ' +
								'{100: \'' + requestBody.position + '\'}, ' +
								requestBody.salary + ', ' +
								'\'' + requestBody.surname + '\')', res);
			});
	}else if(req.method === 'PUT'){
		loadBody(req, res, function onBodyLoaded(requestBodyString){
				var requestBody = JSON.parse(requestBodyString);
				executeCommnad('UPDATE employees SET surname = \'' + requestBody.surname + 
								'\', salary = ' + requestBody.salary + 
								', position = {100: \'' + requestBody.position +
								'\'} WHERE id = ' + requestBody.id + ';', res);
			});
		//executeCommnad('UPDATE employees SET surname = \'' + + '\', salary = \'' + + '' FROM employees WHERE', res);	
	}else{
		res.writeHead(404);
		res.end();
	}
}

function handleSecureEmployeesRequest(req, res){
	
}

function loadBody(req, res, onBodyLoaded){
	var requestBody = '';
    req.on('data', function(chunk) {
   		requestBody += chunk.toString();
    });
    req.on('end', function() {
		onBodyLoaded(requestBody);
    });
}

function executeCommnad(command, res){
	var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'employees'});
	client.execute(command, function (err, result) {
		if (!err){
			res.writeHead(200);
		}else{
			res.writeHead(500);
		}
		res.end();
   	});
}

function writeQueryResultToResponse(query, res){
	var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'employees'});
	var responseJsonString = '';

	var employees = [];
	client.execute(query, function (err, result) {
		console.log('cassandra query result: ' + err + ' ' + result);
		if (!err){
			if (result.rows.length > 0) {
				console.log('result.rows.length: ' + result.rows.length);
				employees = result.rows.map(function(dbEmp){
					return {
						id: dbEmp.id,
						surname: dbEmp.surname,
						position: dbEmp.position[Object.keys(dbEmp.position)[0]],
						salary: dbEmp.salary
					};
				});
				
				responseJsonString = JSON.stringify(employees);
				res.writeHead(200, {
					'Content-Type': 'application/json',
					'Content-Length': Buffer.byteLength(responseJsonString, 'utf8')
				});
				res.write(responseJsonString);
				res.end();
			}else{
				res.write("[]");
				res.end();
			}
		}else{
			res.writeHead(500);
			res.end();
		}
   	});
}