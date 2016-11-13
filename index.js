/**
 * Created by aranga on 29/10/2016.
 */

var config = require('./config.js')();
var dbcon = require('./modules/dbconn.js')(config);
var category = require('./modules/category.js')(dbcon);
var app = require('aws-lambda-http');

//get all
app.get('/category',function (req,res){
    console.log(req);

    if (req.params.name){
        category.searchByName(req.params.name,function(e,r){
            if (e){
                res.sendError(e,'500');
                return;
            }
            res.send(r);
        });
        return;
    }
    category.list(function (e,r) {
        if (e){
            res.sendError(e);
            return;
        }
        res.send(r);
    });
});

//get by id
app.get('/category/{catId}',function (req,res) {
    var id = +req.pathParams.catId || 0;

    category.findById(id, function (e, r) {
        if (e) {
            res.sendError(e, '500');
            return;
        }
        if (!r) {
            res.sendError({"message": "Invalid category id " + id}, '404');
            return;
        }
        res.send(r);
    });
});
//update
app.put('/category/{catId}',function (req,res) {
    var id = +req.pathParams.catId || 0;
    //code needed
    res.send({"id":id});
});

//insert
app.post('/category',function (req,res) {
    category.insert(req.body,function (e,r) {
       if (e){
           res.sendError(e);
           return;
       }
       res.send(r,'201');
    });
});


// This is the handler that's invoked by Lambda
// Most of this code is boilerplate; use as is
exports.handler = app.handler;
