var URL = require("url");
var app = require("express")();
var http = require("http");
var mysql = require("mysql");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'router'
});
connection.connect();
http.createServer(function(req,res){
	
	var myurl = URL.parse(req.url,true);
	if(myurl.query.host){
	var options = {
		host:'www.baidu.com',
		port:'',
		path:'/'
	}
	connection.query("select * from new_router where host = "+"'"+myurl.query.host+"'",function(err,results,fileds){
		options["host"]=results[0]["host"];
		if(results[0]["port"])options["port"]=results[0]["port"];
		options["path"]=results[0]["path"];
		console.log(options);
		
		var real_req = http.request(options,function(real_res){
		   	
		   	  
			  real_res.pipe(res);
		//	  res.end();
			
			
		});
		req.pipe(real_req);
		console.log("done");
	});
	}
	else {
		res.write("Nothing To Do!");res.end();
	}
	
}).listen(8000);


