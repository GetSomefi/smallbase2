let http = require('http');
let urlMod = require('url');
//var dt = require('./timeModule');
let fs = require('fs');

//var express = require('express');
//var app = express();

let server = http.createServer(function (req, res) {
  //console.log('res ', res); 
  if(req.url.indexOf('testStyle.css') != -1){ //req.url has the pathname, check if it conatins '.css'
    fs.readFile('css/testStyle.css', function (err, data) {
      console.log("css test request");
      if (err) console.log(err);
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end(); 
    });
  }else if(req.url.indexOf('.css') != -1){ //req.url has the pathname, check if it conatins '.css'
      fs.readFile(__dirname + req.url, function (err, data) {
        console.log("css request");
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(data);
        res.end();
      });
    }else if(req.url.indexOf('.js') != -1){ //req.url has the pathname, check if it conatins '.css'
      fs.readFile(__dirname + req.url, function (err, data) {
        if (err){ 
          //error handling
          console.log(err);
          res.writeHead(404, {"Content-Type": "text/plain"});
          res.write("404 WHOOAH! JS-file was not found\n");
          res.end();
        }else{
          res.writeHead(200, {'Content-Type': 'application/javascript'});
          res.write(data);
          res.end();
        }
      });
    }else if( //serve images and mp4
      //test http://localhost:8080/img/isoneva_matas-1024x576.jpg
      req.url.indexOf('.gif') != -1 ||
      req.url.indexOf('.png') != -1 ||
      req.url.indexOf('.jpeg') != -1 ||
      req.url.indexOf('.jpg') != -1 ||
      req.url.indexOf('.mp4') != -1 ||
      req.url.indexOf('.svg') != -1

    ){ //req.url has the pathname, check if it conatins '.css'
      //console.log(req.url);

      fs.readFile(__dirname + req.url, function (err, data) {
        if (err){ 
          //error handling
          console.log(err);
          res.writeHead(404, {"Content-Type": "text/plain"});
          res.write("404 WHOOAH! Media was not found\n");
          res.end();
        }else{
          var expression = req.url.split('.')[1];
          var ctype = "";
          switch (expression) {
            case "jpeg":
            case "jpg": ctype="image/jpeg"; break;
            case "gif": ctype="image/gif"; break;
            case "png": ctype="image/png"; break;
            case "svg": ctype="image/svg+xml"; break;
            case "mp4": ctype="video/mp4"; break;

            break;
            default:
          }

          res.writeHead(200, {'Content-Type': ctype});
          res.write(data);
          res.end();
        }
      });

    }else if(req.url == "/home"){
      fs.readFile('home.html', function(err, data) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    }else if(req.url == "/seo"){
      fs.readFile('reactiveSEO/seo.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    }else if(req.url == "/login"){
      fs.readFile('reactiveSEO/login.html', function(err, data) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    }else if(req.url == "/filesystem"){
      fs.readFile('createfile.html', function(err, data) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    }else if(req.url == "/sb2" || req.url == "/smallbase" ){
      fs.readFile('smallbase.html', function(err, data) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    }else if(req.url == "/testweb" ){
      var pageTitle = 'This is as fast as it can get!';
      var htmlStart = '<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charset="utf-8"><title>'+pageTitle+'</title></head><body>';
      var htmlEnd = '  </body></html>';
      fs.readFile('testWebPage.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(htmlStart);
        res.write(data);
        res.write(htmlEnd);
        res.end();
      });
    }else{
      /////////////////////
      //ALL AJAX REQUESTS//
      /////////////////////

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
            if(dataJSON.whattodo == "create"){
              fs.appendFile( dataJSON.filename + '.txt', dataJSON.filecontent, function (err) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                if (err) throw err;
                var data = {success:true};
                res.end(JSON.stringify(data));
              });
            }else if(dataJSON.whattodo == "update"){
              fs.writeFile( dataJSON.filename + '.txt', dataJSON.filecontent, function (err) {
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
                //console.log(file, file.includes("."));

                //if( file.includes(".txt") || file.includes(".json") ){
                if( file.includes(".txt") ){
                  fileList.push(file);
                }
              })
              var data = {
                success:true,
                response:fileList
              };
              res.end(JSON.stringify(data));
            }else if(dataJSON.whattodo == "getListOfSMBS"){
              const folder = "./" + dataJSON.user + "_smb";
              console.log(folder);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              var fileList = [];
              fs.readdirSync(folder).forEach(file => {
                if( file.includes(".json") ){
                  fileList.push(file);
                }
              });
              var data_ = {
                success:true,
                filelist:fileList,
                user:dataJSON.user
              };
              res.end(JSON.stringify(data_));
            }else if(dataJSON.whattodo == "opensmbs"){
              const folder = "./" + dataJSON.user + "_smb";
              var fileandpath = folder + "/" +  dataJSON.filename + ".json";
              console.log("Polku: ",fileandpath);

              res.writeHead(200, { 'Content-Type': 'application/json' });
              //fs.readFile(fileandpath, 'UTF-8', function (err,d) {
              fs.readFile(fileandpath, 'utf8', function (err, d) {
                var ok = true;
                if (err) {
                  ok = false;
                }

                console.log(d);
                d = JSON.parse(d);

                var data = {
                  success:ok,
                  content:d,
                  file:dataJSON.filename
                };

                console.log("Response data Open file: ", data);
                res.end(JSON.stringify(data));
              });


            }else if(dataJSON.whattodo == "updatesmb"){
              console.log("filename ",dataJSON.filename);
              console.log("content ",dataJSON.newcontent);

              fs.writeFile( dataJSON.user + "_smb/" + dataJSON.filename + '.json', JSON.stringify(dataJSON.newcontent), function (err) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                if (err) throw err;
                var data = {success:true};
                res.end(JSON.stringify(data));
              });

            }else if(dataJSON.whattodo == "openfile"){
              res.writeHead(200, { 'Content-Type': 'application/json' });
              fs.readFile(dataJSON.filename, 'UTF-8', function (err,d) {
                var ok = true;
                if (err) {
                  ok = false;
                }

                var data = {
                  success:ok,
                  response:d,
                  file:dataJSON.filename
                };
                console.log("Response data Open file: ", data);
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
        /*
        fs.readFile('index.html', function(err, data) {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data);
          res.end();
        });
        */
        res.writeHead(404, {"Content-Type": "text/html"});
        res.write('<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>404 Error</title></head><body>');
        res.write('<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/3oEjHGrVGrqgFFknfO" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p style="margin-top: -35px;z-index: 1;position: relative;padding: 10px;"><a href="https://giphy.com/gifs/comic-con-jack-sparrow-sdcc2016-3oEjHGrVGrqgFFknfO">via GIPHY</a></p>');
        res.write("<h1>No no no no this can't be happening!</h1>");
        res.write("Content was not found<br>");
        res.write("Url that you tried to access was:<br>");
        res.write("<strong>" + req.url + "</strong><br><br>");
        res.write("<a href='login'>Maybe go here?</a><br>");
        res.write("</body></html>");
        res.end();
      }
    }
    //res.end();
}).listen(8080);