const express=require("express");
const app=express();
const path=require("path");
const http = require("http");
const fs = require("fs");
const PORT=process.env.PORT||80;

//WWW redirect:
function wwwRedirect(req, res, next){
  if(/^[^\.]+\.[^\.]+$/.test(req.headers.host)){
    var newHost="www."+req.headers.host;
    return res.redirect(301, req.protocol+"://"+newHost+req.originalUrl);
  }
  next();
};
app.set("trust proxy", true);
app.use(wwwRedirect);

//static files:
app.use(express.static(path.join(__dirname, "./")));

//website root:
app.get("/", function(req, res){
  res.sendfile("index.html");
});

//start the web server:
app.listen(PORT);
console.log("Process ID "+process.pid+" is now listening on port number "+PORT+".");
