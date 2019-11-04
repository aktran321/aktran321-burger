//import/require connection.js into orm.js
var connection = require("../config/connection.js");

//Create methods that will execute mySQL commands
// selectAll(), insertOne(), updateOne()

//First, we will create a helper function for SQL syntax
//To pass 3 values into the mySQL query, we need 3 question marks
//This function loops through and creates an array of question
// marks and turns it into a string
//["?", "?", "?"].toString() => "?,?,?";

function printQuestionMarks(num) {
    var arr = [];
    for(var i = 0; i < num; i++){
        arr.push("?");
    }
    return arr.toString();
}

//Helper function to convery key object key/value pairs to SQL syntax
function objToSql(ob){
    var arr=[];
    //loop through the keys and push the key/value as a string int arr
    for (var key in obj){
        var value = ob[key];
        //check to skip hidden propertiess
        if (Object.hasOwnProperty.call(ob, key)){
            // if the string has spaces, implement quotation marks
            if(typeof value === "string" && value.indexOf(" ")>=0){
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

//Object for all our SQL statement functions
var orm = {
    all: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    create: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
        queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log("This is my queryString: "+ queryString);

    connection.query(queryString, vals, function(err, result) {
        if (err) {
            throw err;
        }
        cb(result);
    });

    },
    //An example of objColVals would ne {name: panther, sleepy: true}
    update: function(table, objColVals, condition, cb){
        var queryString = "UPDATE " + table;

        queryString += " SET";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
        
        console.log("This is my queryString: "+ queryString);
        connection.query(queryString, function(err, result){
            if(err) {
                throw err;
            }
            cb(result);
        });
    },
    //WIll not be coding a delete button for this assignment
    delete: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;
    
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      }
}
//export the orm object using module.exports
module.exports = orm;