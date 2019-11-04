//setup the code to connect Node to MySql
var mysql =require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "6olpui9Q!!",
    database: "burgers_db"
});

//now that the connection is set up, make the connection
connection.connect(function(err){
    if (err) {
        console.error("error connecting: " +err.stack);
        return;
    }
    console.log("connected as id" + connection.threadId);
});
//export the connection
module.exports = connection;