var fs=require('fs');
var {posts}=require('./database.js');
var showpost=function(socket,userdetail,docs)
{ 
console.log('showpost called');
var count=4;
posts.findOne({username:userdetail.username}).then((docs)=>{ 
var pointer=docs.myposts.length-1;
socket.on('show',(data)=>{
console.log('show');
while(pointer>=0 && count>=0)
{    
      console.log(pointer);
      x=docs.myposts[pointer];
      socket.emit('giveposts',x);
      pointer--;
      count--;
    
}    
});
//socket.on('stop',()=>{
////cross;
//docs.myposts.push({x:true,index:});
////transfering newposts to old posts
//for(i=0;i<docs.newposts.length;i++)
//    {
//        x=docs.newposts.pop();    
//         docs.myposts.push(x);
//    }
//    
//});
});  
}

module.exports={
    showpost
}
