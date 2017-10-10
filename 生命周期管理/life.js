var express = require('express');
var app = express();
var proxy = require('express-http-proxy');
var fs = require("fs");
var init = require("./init.js");
var util = require("util");
var responseTime = require('response-time');
var morgan = require('morgan');
var path = require('path');
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});




app.use(morgan('short', {stream: accessLogStream}));

//app.use(morgan('short'));
init.init(fs,app);
var fundebug = require("fundebug-nodejs");
fundebug.apikey="8a64bc98cf59ba177bd7b1a1dc8fe889cd367cee324c3179f180003f47c8aac5";

//app.errormethod();



//fundebug.notify("hello","error");

app.use(responseTime(function (req, res, time) {
  	
  	//API响应时间管理
  	console.log(req.originalUrl+"--caused "+time+"ms");
  
}))


app.get('/listAPIS', function (req, res) {
   fs.readFile( __dirname + "/" + "API.json", 'utf8', function (err, data) {
     //  console.log( data );
       //console.log(app._router.stack.length);
       
       
       
        
//     for(var x=0;x<app._router.stack.length;x++)
//     {
//     	
//     	if(app._router.stack[x]["name"]=="handleProxy")
//       {
//       	var exp = util.inspect(app._router.stack[x]["regexp"]);
//      
//			console.log(exp);
//       		
//       }
//     }
       
       
       
      // console.log(app._router.stack);
       
       
       res.end( data );
   });
})
app.get('/showAPI/:id', function (req, res) {
   // 首先我们读取已存在的用户
   fs.readFile( __dirname + "/" + "API.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       var API = data[req.params.id];
       console.log( API );
       res.end( JSON.stringify(API));
   });
});
app.get('/editAPI/:id', function (req, res) {
   // 首先我们读取已存在的用户
   fs.readFile( __dirname + "/" + "API.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       var API = data[req.params.id] ;
       var name = req.query.name;
       var src = req.query.src;
       var des = req.query.des;
       //delete and add,that's ok;
       //
       
       console.log( API );
       res.end( JSON.stringify(API));
   });
});




app.get('/addAPI', function (req, res) {
   // 读取已存在的数据
   fs.readFile( __dirname + "/" + "API.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       var name = req.query.name;
       var src = req.query.src;
       var des = req.query.des;
       var API = {
   	name:{
      "name" : name,
      "src" : src,
      "des" : des,
          }
                  }
	   console.log(name+"  "+src+"  "+des);
	   console.log("API="+JSON.stringify(API));
	      	
       if(name&&src&&des){
       console.log("API[name]="+API["name"]);
       data[name] = API["name"];
       //console.log( data );
       	app.use("/"+src, proxy(des));
       fs.writeFile(__dirname + "/" + "API.json",JSON.stringify(data),function(err){
       	//console.log("err = "+err);
        if(err){
        	console.log(err);
        	
        }
       });
       
       
       }
       else {
       	console.log("Error!");
       	
       }
       res.end( JSON.stringify(data));
   });
})
app.get('/deleteAPI', function (req, res) {

	
   // First read existing users.
   console.log(app._router.stack);
   fs.readFile( __dirname + "/" + "API.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       var name = req.query.name;
       var dataName=data[name];
       delete data[name];
       //console.log( data );
       if(name){
       	
       fs.writeFile(__dirname + "/" + "API.json",JSON.stringify(data),function(err){
       	if(err)console.log("err = "+err);
       });	
       
       
       //delete hot start
       console.log("dataName = "+dataName["name"]);
       console.log("dataSrc = "+dataName["src"]);
       console.log("dataDes = "+dataName["des"]);
       for(var x=0;x<app._router.stack.length;x++)
       {
       	
       	if(app._router.stack[x]["name"]=="handleProxy")
         {
         	var name = util.inspect(exp);
         	var exp = util.inspect(app._router.stack[x]["regexp"]);
         	
			if(exp.indexOf(dataName["src"])>=0)
			{
				console.log("find "+dataName["src"]);
				//var temp = app._router.stack[x];
				app._router.stack[x] = app._router.stack[app._router.stack.length-1];
				app._router.stack.pop();
				//delete app._router.stack[x];
			}
			
			//console.log();
         		
         }
       }
       //delete hot end
       
       
       
       
       }
       
       
       
       
       res.end( JSON.stringify(data));
   });
})
//app.get("/proxyAPI/*",function(req,res){
	
	//var API = req.query.API;
	//console.log(API);
	//var proxy = require('express-http-proxy');
	//var app = require('express')();
	//app.use('/proxyAPI/*', proxy('https://www.baidu.com'));
	
	//res.end();
	
//});





var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})