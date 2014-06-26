
/**
 * Module dependencies.
 */
"use strict";

var express = require('express');
var http = require('http');
var path = require('path');
var spawn = require('child_process').spawn;
var fs = require("fs");
var watch = require("watch");
var app = express();
var ejs = require('ejs');
var sourceDir = "source";
var buildDir = "build";

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, '')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


var fileList = fs.readdirSync(path.join(__dirname, sourceDir));
function compile (from){
    var fileName = from.split(".");
    fileName.pop();
    var to = fileName.join('.') + ".html";
    var source = path.resolve(__dirname, sourceDir, from);
    var dist =  path.resolve(__dirname, buildDir, to);
    console.log("[compile]", source, "\n\t==>",dist);
    try{
        ejs.renderFile(source, function(err, result){
            if(err){
                console.log(err);
                return false;
            }
            fs.writeFileSync(dist, result);
        });

    }catch(e){
        console.log('.', e.toString());
    }
}

function buildOnce(){
    fileList.forEach(function(e){
        if(e.split(".").pop() == 'html'){
            compile(e);
        }
    })
}

buildOnce();

watch.createMonitor(path.resolve(__dirname, sourceDir), function (monitor) {
    monitor.on("created", function (f) {
       compile(f)
    });
    monitor.on("changed", function (f) {
        console.log("[Change] File change detected, ready to compile ->",path.resolve(__dirname,sourceDir,f));
        compile(path.basename(f));
    });
    monitor.on("removed", function (f) {
        var buildedFile = path.resolve(__dirname, buildDir, f.replace('.ejs','.html'));
        fs.unlinkSync(buildedFile);
    });
    //monitor.stop();
});

app.get("/:params", function(q,s,next){
    var buildDirList = fs.readdirSync(path.join(__dirname, sourceDir));
    var found = false;
    buildDirList.forEach(function(e){
        var d = e.split(".");
        d.pop();
        if(d.join('.') == q.params.params){
            found = true;
            s.sendfile(path.resolve(__dirname,buildDir, e))
        }
    });
    if (!found){
        next()
    }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  spawn('open', ['http://127.0.0.1:4000']);
});
