/*************************************
 * Modules
 *
 * **********************************/
var util = require('util');


 var LoggerMiddleware = function(req,res,next){
	console.log('header:' +util.inspect(req.headers));
	console.log('body:' +util.inspect(req.body));
	console.log('get parameters:' +util.inspect(req.query));
	console.log('visit number: '+req.visit+"\n");
	next();
 };

 //basic visit count (need to improve)
 var visit = 0;
 var VisitMiddleware = function(req,res,next){
	visit ++;
	req.visit = visit;
	next();
 };

 var express = require('express');
 var app = express.createServer();
 app.use(VisitMiddleware);
 app.use(LoggerMiddleware);
 app.use(express.bodyParser());
 
 // routes
 
 app.all('/',function(req,res){
	res.header('200');
	res.write("the request is logged\n");
	res.write("You are the visit n° "+req.visit+"\n");
	res.end();

 });
 app.listen(3001);

