var mysql = require("mysql");
require("./connection.js");

module.exports = {
    
function selectAll() {
    connection.query("SELECT * FROM burgers", function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        return results
    });
}

function insertOne(data) {
    connection.query("INSERT INTO burgers VALUES ?", data, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        return results
    });
}

function updateOne(data) {
    connection.query("UPDATE burgers SET ?", data, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        return results
        });
    }
}