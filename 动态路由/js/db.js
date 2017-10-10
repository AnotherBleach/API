function getConnection(t_host,t_user,t_password,t_database)
{
	var mysql = require('mysql');
	var connection = mysql.createConnection({
  host     : t_host,
  user     : t_user,
  password : t_password,
  database : t_database
	});
connection.connect();
return connection;
}
exports.getConnection = getConnection;
