var mysql = require('mysql');
module.exports = function (config){

   var ret = {
        create:create
   };

   return ret;


   function create(){

       console.log(config);
       var connection = mysql.createConnection(config);

       connection.connect(function(err){
           if(err){
               console.log('Error connecting to Db');
               return;
           }
           console.log('Connection established');
       });

       return connection;
   }



};
