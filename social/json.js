var {io}=require('./express.js');
var path=require('path');
var fs=require('fs');
var hbs=require('hbs');
var multer =require('multer');
var session = require("client-sessions");
var upload=multer({dest:'public/uploads/'});
var {user}=require('./database');
var express= require('express');
var {app}=require('./express.js');
var fs=require('fs');

app.get('/video',(req,res)=>{  res.sendFile(__dirname+'/base64.html');	
});