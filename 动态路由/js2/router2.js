var express = require('express');
var app = express();
var router = express.Router();
var util = require("util"); 
var url = require('url');
var proxy = require("express-http-proxy");
//app.use("/"+temp["src"], proxy(temp["des"]));
router.count = 0;
router.get('/types/:type', function(req, res, next) {
    console.log(req.params.type);
    //var query = url.parse(req.url, true).query;
    var website = req.params.type;
    var http = require('http');
    var opt={
    host:"www."+website+".com"
    	
    }
    var req2 = http.request(opt, function (res2) {
    res.writeHead(res2.statusCode, res2.headers);
    res2.pipe(res);
    res2.on('end', function () {
    	console.log("done");
     // log('#%d\tEND', num);
    });
  });
    res.end();
});
app.use("/APIGateWay",router);
app.listen(3000);