var redis=require('redis');
var pub=redis.createClient();
var send=function(userdetail,docs,data){
console.log(data);
var y=userdetail.username+'post';
pub.publish(y,data.content);
 for(i=0;i<docs.friends.length;i++)
    {   var x=docs.friends[i].username+'post';
            console.log('yooooooo000'+x);
              pub.publish(x,data.content);
    }    
};
module.exports={
    send
}