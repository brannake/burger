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

  update2: function(table, vals, condition, cb) {
    var queryString = "UPDATE " + table;
    queryString += " SET ";
    queryString += "burger_name = "+vals;
    queryString += " WHERE ";
    queryString += condition;
    queryString += ";";
    console.log(queryString);
    connection.query(queryString, function(err, results) {
      if (err) {
        throw err;
      }
      cb(results);
    })
  },

  delete: function(table, id, cb) {
    console.log(table);
    console.log(id);
    var queryString = "DELETE FROM "+table+" WHERE id = "+id;
    console.log(queryString);
    connection.query(queryString, function(err, result) {
      console.log(result);
      cb(result);
    });
  }
};

module.exports = orm;