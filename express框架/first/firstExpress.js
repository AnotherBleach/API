var express = require('express');
var app = express();
var util =  require("util");
app.get('/', function (req, res) {
  // res.send('Hello World');
   res.write("hello,");
   res.write(req.baseUrl);
   res.end(req.hostname);
   
})
app.get('/helloworld', function (req, res) {
  	//res.send('Hello World');
   //res.write("hello,");
   //res.write(util.inspect(req.params));
   
   res.write(req.query.test);
   res.write(util.inspect(req.route));
   res.end(req.hostname);
   
})//we can use the regular expression
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s-%s", host, port)
 
})