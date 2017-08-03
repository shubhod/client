var socketio=require('socket.io');
var http=require('http');
var express= require('express');
var app= express();
var server=app.listen(3000,()=>{
    console.log("server is up");
});
var io=socketio(server);
module.exports={
  io,
  server,
  app
}

