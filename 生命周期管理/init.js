//从文件加载资源//API.json
function init(fs,app){
var util = require("util");
//console.log("hello");
var proxy = require('express-http-proxy');
	fs.readFile( __dirname + "/" + "API.json", 'utf8', function (err, data) {
       
       
       //data = JSON.parse( data ,function(k,v){
       	
       	  //console.log("k = "+k);
       	  //console.log("v = "+v);
       	  //console.log("\n");
       //});
       data= JSON.parse(data);
       console.log(data);
       for(var item in data)
       {
       	//console.log("hello world");
       	//console.log(item);
       	//console.log(value);
       	var temp = data[item];
       	app.use("/"+temp["src"], proxy(temp["des"]));
       
       }
       //random test
       function coinToss() {
       	
       	var exec = require('child_process').exec;
       	exec("ping www.baidu.com",function(err,stdout,stderr){
       			
       		console.log("baidu "+typeof stdout);
       		
       	});
       	exec("ping www.taobao.com",function(err,stdout,stderr){
       		console.log("taobao "+stdout);
       		
       		
       	});
       	
       	return Math.random() > .5
        
       
       }
  function getHost() {
  	
  	return coinToss() ? 'https://www.taobao.com/' : 'https://www.baidu.com/'
  
  
  }
 
  app.use("/random",proxy(getHost, {
    memoizeHost: false
  }))
       
       //random test
       
       console.log("done");
       
       //res.end( JSON.stringify(API));
   	   
	});

}
exports.init=init;