/**
 * Created by aranga on 29/10/2016.
 */

var config = require('./config.js')();
var dbcon = require('./modules/dbconn.js')(config);
var category = require('./modules/category.js')(dbcon);

// This is the handler that's invoked by Lambda
// Most of this code is boilerplate; use as is
exports.handler = handler;

//definitions
function handler(event, context, callback) {
    console.log(event.method);
    switch (event.method){
        case "GET":
            processGet(event,callback);
            break;
        case "POST":
            processPost(event,callback);
            break;
        case "PUT":
            processPut(event,callback);
            break;
        default:
            callback("not implemented");
    }

}

function processGet(event,callback) {

    console.log("processGet()");
    if (event.params.querystring && event.params.querystring['name']){
    
        category.searchByName(event.params.querystring.name,callback);
        return;
    }
    if (event.params.path && event.params.path['catId']){
    
        category.findById(event.params.path.catId,callback);
        return;
    }
    category.list(callback);
   
}

function processPost(event,callback) {
   category.insert(event.body,callback);
}
function processPut(event,callback) {
    callback("not implemented yet");
}