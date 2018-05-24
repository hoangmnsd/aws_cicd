var mysql=require('mysql');
var connection=mysql.createPool({
 
host:'127.0.0.1',
port: '3306',
user:'root',
password:'1111',
database:'awsdb'
 
});
module.exports=connection;