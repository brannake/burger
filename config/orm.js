var mysql = require("mysql");
var connection = require("./connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}
// Helper function for SQL syntax.
function objToSql(ob) {
  var arr = [];
  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      arr.push(key + "=" + ob[key]);
    }
  }
  return arr.toString();
}

var orm = {
    
all: function (tableInput, cb) {
    connection.query("SELECT * FROM "+tableInput+";", function (error, results, fields) {
        if (error) {
            throw error;
        }
        console.log('The solution is: ', results);
        cb(results);
    });
},

insert: function (table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, results) {
      if (err) {
        throw err;
      }
      cb(results);
    });
  },

  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;
    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;
    console.log(queryString);
    connection.query(queryString, function(err, results) {
      if (err) {
        throw err;
      }
      cb(results);
    })
  }
}

module.exports = orm;