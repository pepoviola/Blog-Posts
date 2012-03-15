
/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
	//   app.set('views', __dirname + '/views');
	//   app.set('view engine', 'ejs');
	// app.set('view options', {
	// 		layout: false
	// });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  // app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes

app.get('/',function(req,res){
	res.write('handler : / \n');
	res.end();
});

app.get('/users/:id?',function(req,res){
	res.write('handler: /users/:id? \n');
	res.write('parametros: \n');
	for(key in req.params){
		res.write('\t'+key+' : '+req.params[key]);
	}
	res.write('\n');
	res.end();	
});

/* gets without regex */
// app.get('/users/:id/:action',function(req,res){
// 	res.write('handler: /users/:id \n');
// 	res.write('parametros: \n');
// 	for(key in req.params){
// 		res.write('\t'+key+' : '+req.params[key]+'\n');
// 	}
// 	res.end();	
// });

/* gets with regex */
app.get('/users/:id([0-9]+)/:action(edit|delete|create)',function(req,res){
	res.write('handler: /users/:id \n');
	res.write('parametros: \n');
	for(key in req.params){
		res.write('\t'+key+' : '+req.params[key]+'\n');
	}
	res.end();	
});

/* post */
app.post('/users',function(req,res){
	res.write('handler post: /users/ \n');
	res.write('parametros en body: \n');
	for(key in req.body){
		res.write('\t'+key+' : '+req.body[key]+'\n');
	}
	res.end();	
});

/* We can use put to be more semantics, like a RESTful api.
	 For this be use the middleware methodOverride, this 
	 middleware check for the input _method in the body
	 (this input could be hidden for don't show to the 
	 end user), and if its present tranform the post in the 
	 _method input value and don't pass this in req.body
 */
app.put('/users',function(req,res){
	res.write('handler put: /users/ \n');
	res.write('parametros en body: \n');
	for(key in req.body){
		res.write('\t'+key+' : '+req.body[key]+'\n');
	}
	res.end();	
});

/* delete, as in put we can use methodOverride to be
   more semantic 
*/
app.delete('/users',function(req,res){
	res.write('handler delete: /users/ \n');
	res.write('parametros en body: \n');
	for(key in req.body){
		res.write('\t'+key+' : '+req.body[key]+'\n');
	}
	res.end();	
});

/* Last but not least!
   we can set to response for all methods (GET, POST, DELETE, PUT)
   this is great for handler errors in all methods
*/
app.all('*',function(req,res){
	res.write('handler all: *\n');
	res.write('ERR, no regex match\n');
	res.end();
});


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
