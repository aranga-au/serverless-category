/**
 * Created by aranga on 29/10/2016.
 */

var config = require('./config.js')();
var dbcon = require('./modules/dbconn.js')(config);
var category = require('./modules/category.js')(dbcon);
var app = require('aws-lambda-http');

app.get('/test',function (req,res){
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

app.get('/test/{catId}',function (req,res) {
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
    })
});


app.post('/test',function (req,res) {
    category.insert(req.body, function (e, r) {
        callback(null, resp.create(r, '201'));
    });
});
// This is the handler that's invoked by Lambda
// Most of this code is boilerplate; use as is
exports.handler = app.handler;
