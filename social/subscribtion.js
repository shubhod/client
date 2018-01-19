var redis=require('redis');
var client = redis.createClient(); 
var sub=redis.createClient();
var subscribtion=function(userdetail,socket){
var userdetailpost=userdetail.username+'post';
sub.subscribe(userdetailpost);
var online=userdetail.username+'online';
sub.subscribe(online);
sub.subscribe(userdetail.username);
sub.on('message',(channel,message)=>{
console.log(channel);
console.log(JSON.stringify(message)+'to channel'+channel);    
socket.emit(channel,message);  
});
};
module.exports={
 subscribtion
}