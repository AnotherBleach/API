var http = require("http");
var url = require("url");
var util = require('util');
var con = require('./db.js').getConnection("localhost","root","","router");
function getUserProvince(response,phoneNumber)
{
	//query where does this number belong to.
	con.query("select * from router where src = "+"'"+phoneNumber+"'",function(err,results,fileds){
		
		if(err) console.log("error = "+err);
		else{
			console.log(util.inspect(results));
			console.log(results[0]["des"]);
			response.write("<br/>hello,this is from "+results[0]["des"]+",and it's owner is "+phoneNumber);
			response.end();
		}
		
		
	});
	
}
function sendTo(response,province,phoneNumber)
{
	
	//window.open("http://www.sohao.org/"+phoneNumber);
	//response.writeHead(302, {
  //'Location': "http://www.sohao.org/"+phoneNumber
  //add other headers here...
	
}
http.createServer(
	function (request, response)
		{
			 response.writeHead(200, {
          "Content-Type": "text/html;charset=utf-8"
      });

			
   //var pathname = url.parse(request.url).pathname;
   //response.write(util.inspect(url.parse(request.url, true)));
   var params = url.parse(request.url, true).query;
   
   if(params.type)
   {
   		response.write("API类型："+params.type);
   		switch(params.type){
   			case "呼叫控制":
   				if(params.userPhone)
   				{
   					
   					province =getUserProvince(response,params.userPhone);
   					console.log("province = "+province);
   					////sendTo(response,province,params.userPhone);
   					
   				}
   				else{
   					
   					response.write("\n请提供对应的用户号码");
   					
   				}
   				
   			break;
   			case "号码翻译":
   				if(params.userPhone)
   				{
   					
   					province = getUserProvince(response,params.userPhone);
   					//sendTo(response,province,params.userPhone);
   					
   					
   					
   					
   				}
   				else{
   					
   					response.write("\n请提供对应的用户号码");
   					
   				}
   			
   			break;
   			case "外呼":
   				if(params.userPhone)
   				{
   					
   					province = getUserProvince(response,params.userPhone);
   					//sendTo(response,province,params.userPhone);
   					
   				}
   				else{
   					
   					response.write("\n请提供对应的用户号码");
   					
   				}
   			
   			break;
   			case "多方通话":
   				if(params.userPhone)
   				{
   					
   					province = getUserProvince(response,params.userPhone);
   					//sendTo(response,province,params.userPhone);
   					
   				}
   				else{
   					
   					response.write("\n请提供对应的用户号码");
   					
   				}
   			
   			break;
   			case "管道":
   				if(params.userPhone)
   				{
   					
   					province = getUserProvince(response,params.userPhone);
   					//sendTo(response,province,params.userPhone);
   					
   				}
   				else{
   					
   					response.write("\n请提供对应的用户号码");
   					
   				}
   			
   			break;
   			case "IVR":
   				if(params.userPhone)
   				{
   					
   					province = getUserProvince(response,params.userPhone);
   					//sendTo(response,province,params.userPhone);
   					
   				}
   				else{
   					
   					response.write("\n请提供对应的用户号码");
   					
   				}
   			
   			break;
   			case "消息":
   				if(params.userPhone)
   				{
   					
   					province = getUserProvince(response,params.userPhone);
   					//sendTo(response,params.userPhone);
   					
   				}
   				else{
   					
   					response.write("\n请提供对应的用户号码");
   					
   				}
   			
   			break;
   			default:response.write("\n系统暂未收录该类型！");
   			
   		}
   		
   	
   }
   else{
   	
   	response.write("No Type Given");
   	
   	
   }
   
   //response.write(pathname);
      //response.end();
      }   
).listen(8081);
