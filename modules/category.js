/**
 * Created by aranga on 29/10/2016.
 */
var mysql = require('mysql');
module.exports  = function(dbcon){

	//interface
    var ret ={
        list:list,
        searchByName:searchByName,
        findById:findById,
        insert:insert,
        remove:remove
    };
    return ret;
    
	//implementations
    function list(callback){
        var con = dbcon.create();
        con.query("select * from category",function (err,rows){
            console.log(err);
            console.log(rows);
            if (err){
                callback(err,[]);
                return;
            }
            callback(err,rows);
            con.end();
        });
    }

    function findById(id,callback){
        var con = dbcon.create();
        con.query("select * from category where id = "+id,function (err,rows){
            console.log(err);
            console.log(rows);
            if (err){
                callback(err,null);
                return;
            };
            if (rows == null || rows.length ==0)
            {
                callback(null,null);
                return;
            }
            callback(err,rows[0]);
            con.end();
        });
    }

    function searchByName(name,callback){
        var con = dbcon.create();
        console.log("findByName");

        con.query("select * from category where category_name like '"+name+"%'",function (err,rows){
            console.log(err);
            console.log(rows);
            if (err){
                callback(err,null);
                return;
            }
            callback(err,rows);
            con.end();
        });
    }
    function insert(category,callback){
        var con = dbcon.create();
        if (!category || !category["category_name"])
        {
            callback("Empty category");
        }
        //remove category id (auto increment)
        if (category['id']){
            delete category['id'];
        }
        con.query("INSERT INTO category SET ?",category,function (err,resp){

            if (err){
                console.log("Error !!");
                console.log(err);
                callback(err,null);
                return;
            }
            console.log("succesful inserted [id:"+resp.insertId+"]");
            category["id"] = resp.insertId;
            callback(err,category);
            con.end();
        });
    }

    function remove(){

    }
};