var http = require('http');
var urlMod = require('url');
var dt = require('./timeModule');
var fs = require('fs');

var express = require('express');
var app = express();

http.createServer(function (req, res) {
    /*
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("The date and time are currently: " + dt.myDateTime());
    res.write("<br />Jou Hey,<br />");
    res.write(req.url);
    */

    /*
    var q = urlMod.parse(req.url, true).query;
    if(q.data){
      res.write("<br />Got this parameter: " + q.data);
    }else{
      res.write("<br />Use parameter ?data=[command]");
    }
    */



    if(req.url == "/home"){
      fs.readFile('home.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    }else if(req.url == "/filesystem"){
      fs.readFile('createfile.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    }else{
      var q = urlMod.parse(req.url, true).query;
      //console.log(req.url);
      //console.log(q.json);

      if(q.json){
        console.log("Got request: ",q)
        if(q.json == "write"){
          if(q.data){
            var dataJSON = JSON.parse(q.data);
            console.log("There is data: ", dataJSON );
            console.log("createfile", dataJSON.whattodo);
            if(dataJSON.whattodo == "createfile"){
              fs.appendFile( dataJSON.filename + '.txt', dataJSON.filecontent, function (err) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                if (err) throw err;
                var data = {success:true};
                res.end(JSON.stringify(data));
              });
            }else if(dataJSON.whattodo == "listfiles"){
              const folder = "./";
              res.writeHead(200, { 'Content-Type': 'application/json' });
              var fileList = [];

              fs.readdirSync(folder).forEach(file => {
                console.log(file, file.includes("."));

                if( file.includes(".txt") || file.includes(".json") ){
                  fileList.push(file);
                }
              })
              var data = {
                success:true,
                response:fileList
              };
              res.end(JSON.stringify(data));
            }else if(dataJSON.whattodo == "openfile"){
              fs.readFile(dataJSON.filename, 'utf8', function (err,data) {
                var ok = false;
                if (err) {
                  ok = false;
                }
                ok = true;

                var data = {
                  success:ok,
                  response:data
                };
                res.end(JSON.stringify(data));
              });
            }else{
              res.writeHead(200, { 'Content-Type': 'application/json' });
              var data = {
                success:false,
                reason:"Unknown command :("
              };
              res.end(JSON.stringify(data));
              console.log("What to do?");
            }
          }

          /*
          fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            if (err) throw err;
            var data = {success:true};
            res.end(JSON.stringify(data));
          });
          */

        }
      }else{
        fs.readFile('index.html', function(err, data) {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data);
          res.end();
        });
      }
    }



    //res.end();
}).listen(8080);

console.log('Node.js web server at port 8080 is running..')
/*
http.createServer(function (req, res) {
  if(req.url == "/createfile"){

    //fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      //if (err) throw err;
      var data = "Success";
      res.write( JSON.stringify(data) );
      res.end();
    //});
  }
}).listen(3000);
*/
