var redis=require('redis');
var client = redis.createClient();
client.rpush(['framework', 'angularjs'], function(err, reply){
console.log(reply); 
});
client.lrange('framework', 0, -1, function(err, reply) {
reply.forEach((data)=>{
console.log(data);    
});
});
client.del('framework',(err,rply)=>{
    console.log(rply);
});
