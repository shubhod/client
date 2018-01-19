var {user}=require('./database.js');
var redis=require('redis');
var client = redis.createClient(); 
var ss = require('socket.io-stream');
var fs=require('fs');
var {send}=require('./send.js');
var {posts}=require('./database.js');
var post=function(socket,userdetail,docs){
console.log('post function called');
var fileCount=docs.fileCount;
    if(!fileCount)
        {
            fileCount=0;
            docs.fileCount=0;
        }
    if(!contentCount)
        {
            contentCount=0;
            docs.contentCount=0;
        }
console.log('fileCount'+fileCount);
var contentCount=docs.contentCount;
ss(socket).on('file',function(data,extension){
console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii ');
var file='file';
console.log(data);
var path=filepathSetter(file,fileCount)+'.'+extension;
data.pipe(fs.createWriteStream(path));
path=path.split('./public')[1];
client.rpush([userdetail.username,path],function(err,rply){
console.log(userdetail.username)
console.log('replypushhhhhhhhhhhhhhhhh'+rply);
});
});
socket.on('content',(data)=>{
console.log('content came');
var content='content';
docs.friends.forEach((v)=>{
console.log(v);
posts.findOne({username:v.username}).then((docs1)=>{
console.log(docs1);
if(docs1.online)
{
console.log('online');
var path=filepathSetter(content,contentCount);
docs1.newposts.push({username:userdetail.username});
console.log(docs1.newposts.length);
docs1.newposts[docs1.newposts.length-1].content=data.content;
client.lrange(userdetail.username, 0, -1,function(err, reply){
reply.forEach((v)=>{
docs1.newposts[docs1.newposts.length-1].file.push(v);
console.log(v);
});
docs1.save().then((docs)=>{
if(docs)
{
console.log('done');
client.del(userdetail.username, function(err, reply){
console.log(reply);
});
}
},(err)=>{console.log(err)}); 
});
}
if(!docs1.online)
{
console.log('offline');
var path=filepathSetter(content,contentCount);
docs1.myposts.push({username:userdetail.username});
console.log(docs1.newposts.length);
docs1.myposts[docs1.myposts.length-1].content=data.content;
client.lrange(userdetail.username, 0, -1,function(err, reply){
reply.forEach((v)=>{
docs1.myposts[docs1.myposts.length-1].file.push(v);
console.log(v);
});
docs1.save().then((docs)=>{
if(docs)
{
console.log('done');
client.del(userdetail.username, function(err, reply){
console.log(reply);
});
}
},(err)=>{console.log(err)}); 
});  
}
});        
});
docs.personalPosts.push({content:data.content});
docs.save().then((docs)=>{console.log('path updated')},(err)=>{console.log(err)});
});
var filepathSetter=function(string,count){
var x=string;
if(x=='file')
    {
        count=count+1;
        docs.fileCount=count;
        fileCount=count;
        console.log(fileCount);
    }
if(x=='content')
    {
        count=count+1;
        docs.contentCount=count;
    }
path='./'+'public/'+userdetail.username+'/'+userdetail.username+string+count;
return path;
};
}; 
module.exports={
    post
};