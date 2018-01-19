var myArgs = process.argv.slice(2);
var socketio=require('socket.io');
var http=require('http');
var express= require('express');
var app= express();
var server=app.listen(myArgs[0],()=>{ 
console.log("server is up",myArgs); 
});
var io=socketio(server);
module.exports={
  io,
  server,
  app,
  myArgs  
};
