var express=require('express');
var socketio=require('socket.io');
var app=express();
var redis=require('redis');
var server=app.listen(5000,()=>{
    console.log("server is up");
});
app.get('/red',(req,res)=>{
    res.sendFile(__dirname+'/from.html');
});
var io=socketio(server);
var client=redis.createClient();
client.on('connect',()=>{
console.log('connected to redis');
});

client.set('deep','deep',(err,rply)=>{
    console.log(rply);
    if(err)
        {
            console.log(err);
        }
});
client.get('deep',(err,rply)=>{
    console.log(rply);
    if(err)
        {
            console.log(err);
        }
    
});
