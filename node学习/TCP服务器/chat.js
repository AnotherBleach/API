TCP = require("net");
TCP.createServer(function(client){
	client.write("hi!");
	client.write("bye");
	client.end();
}).listen(9000);
