let mysql = require('mysql');
 
let connection = mysql.createConnection({
   host:        'localhost',
   user:        'root',
   password:    '',
   database:    'database_mahasiswa'
 });

connection.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Terhubung');
   }
 })

module.exports = connection;