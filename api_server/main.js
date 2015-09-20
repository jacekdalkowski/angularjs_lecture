var http = require('http');
var jwt = require('jwt-simple');
var fileSystem = require('fs');
var path = require('path');
var cassandra = require('cassandra-driver');
//var async = require('async');
var tokenSecret = '1234567890';

http.createServer(function (req, res) {
	console.log('Got request for: ' + req.url);
	if(req.url.indexOf('/api/employees') == 0){
		handleEmployeesRequest(req, res);
	}else if(req.url.indexOf('/api/secure/employees')){
		handleSecureEmployeesRequest(req, res);
	}else{
		res.writeHead(401);
	}
    
}).listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/.');

function handleEmployeesRequest(req, res){
	if(req.method === 'GET'){
		var employeeIdUrlPattern = /api\/employees\/(d+)/i;
		var employeeIdUrlMatch = req.url.match(employeeIdUrlPattern);
		if(employeeIdUrlMatch){
			writeQueryResultToResponse('SELECT id, surname, position, salary FROM employees;', res);
		}else if(req.url === '/api/employees'){
			writeQueryResultToResponse('SELECT id, surname, position, salary FROM employees;', res);
		}else{
			res.writeHead(401);
		}
	}else if(req.method === 'POST'){
		
	}else if(req.method === 'PUT'){
		
	}else if(req.method === 'PUT'){
		
	}else if(req.method === 'DELETE'){
		
	}else{
		
	}
}

function handleSecureEmployeesRequest(req, res){
	
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
			}
		}else{
			res.writeHead(500);
		}
   	});
}