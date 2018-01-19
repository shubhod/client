var userdetail=require('./server.js');
var {user}=require('./database');
var {friend}=require('./database');
var {flag}=require('./database');
var redis=require('redis');
var fs=require('fs');
var pop=function(socket,userdetail)
{
            var pub=redis.createClient();
         var sub=redis.createClient();
if(userdetail)
{ console.log(userdetail);
  var dir ='./'+userdetail.username;
  sub.subscribe
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}    
socket.on('displaypic',(data)=>{
    var x;
    x=dir+"/"+userdetail.username+".txt";
    console.log(x);
    fs.writeFileSync(x,data);	   	   
    user.findOneAndUpdate({username:userdetail.username},{displaypic:x},{upsert:true,new:true}).then((docs)=>{
	if(docs)
		{
			console.log("display pic updation"+docs);
			
		}
	   else
		   {
			   console.log("not updated");
		   }
});     	   
});	
}  	   
         
         socket.on('workplace',(workplace)=>{
	 console.log(workplace.name);		
	user.findOneAndUpdate({username:userdetail.username},
	{
	 workplace:{name:workplace.name,id:workplace.id}	
	}
	,{upsert:true,new:true}).then((docs)=>{
		if(docs)
			{
				console.log("workplace updation"+docs);
			}
	});
	});	
	socket.on('livesin',(livesin)=>{
	console.log(livesin.name);
	console.log(livesin.id);	
	user.findOneAndUpdate({username:userdetail.username},{livesIn:{name:livesin.name,id:livesin.id}},{upsert:true,new:true}).then((docs)=>{if(docs){console.log("livesin updation"+docs);}});	
	});
	socket.on('hometown',(hometown)=>{
	user.findOneAndUpdate({username:userdetail.username},{hometown:{
	  name:hometown.name,
	  id:hometown.id	
	}},{upsert:true,new:true}).then((docs)=>{
		if(docs)
			{console.log('hometownupdation'+docs);}
		
	})	
	}); 
	var count=0; 
	if(userdetail)
	{
	user.findOne({username:userdetail.username}).then((docs)=>{         
	var dost=docs;            
	if(docs )
	 { 
	   if(docs.displaypic)
	  {   
               var fiel=fs.readFileSync(docs.displaypic,'utf8');
	      console.log("user route connected");	  
               socket.emit('displaypic',fiel);   
	  }
            socket.emit('username',{username:userdetail.username,name:docs.name});	   
          
		        
	 }
	          else
		     {
			     console.log("displaypic not found");
		     }
                                function loop(n,docs,y)
		              {
				   
				  for(i=0;i<n;i++)
				   {
					
					   for(j=0;j<docs.length;j++)
						   {
							if(y[i].username===docs[j].username)
								{
									docs.splice(j,1);
								}
						   }
				   }
				     
	                            		
      			     }
		            
		              function resul(docs){
		              if(dost.friends)		     
			    { if(dost.friends.length>0)
			      {        loop(dost.friends.length,docs,dost.friends); 
				      console.log("friends");
				  
				      
			      }
			     console.log("friendso"+dost);
			    }
			       if(dost.friendrequests)	     
			       {if(dost.friendrequests.length>0)
				{ 
				   loop(dost.friendrequests.length,docs,dost.friendrequests);	
				       console.log("friendreq");	
				}
			       console.log(docs.friendrequests);	
			       }
			       if(dost.requestlist)	     
			     {  if(dost.requestlist.length>0)
				{ 
				   loop(dost.requestlist.length,docs,dost.requestlist);
			               console.log("friendszoooooooooooooooo");		
					
				}	
				     }
	                       var result=docs.filter((val)=>{		     
                                return val.username!=userdetail.username					          
                                 }).map((docs)=>{return x={username:docs.username,displaypic:docs.displaypic}});
//			       
			      return result;	     
                                 };
		
		
		
			   if(docs.workplace)
		     {  
                                 var workplaceid=docs.workplace.id;
			      user.find({'workplace.id':workplaceid}).then((docs)=>{
				if(docs)
				{        
				 	 var result=resul(docs);
					 result.push("workplace");
                                              socket.emit('friendSuggestions',result);
					
					
					
				}
				 else
				    {
				     console.log("no match found");  
				    }
			 },(e)=>{console.log(e)});    
		     }
		    user.find({'livesIn.id':docs.livesIn.id}).then((docs)=>{
			    if(docs!=null)
				    {     
					 var result=resul(docs);
					 result.push("workplace");
                                              socket.emit('friendSuggestions',result);
						
					  
				    }
			    else
				    {
					    console.log("not found");
				    }
		  },(e)=>{console.log(e);});

var count=0;	
socket.on('giveme',(i)=>{
    
if(count==0)
	{
	          
		 var arr=[];	
if(docs.friendrequests.length<8 && docs.friendrequests.length>0 )
	{        
		loader(docs.friendrequests.length,arr);
		socket.emit('frequests',arr);
	}
	
if(docs.friendrequests.length>=8 )
	{
	     loader(8,arr);
	     console.log(arr);
	     	
	     pos=8;	
		
	}
	count=1;	
	}
});
var pos;			
socket.on('giveme1',()=>{    
console.log('positionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn'+pos);	
if(docs.friendrequests.length>0)
{  
var arr=[];	
var diff=docs.friendrequests.length-pos;	
if(diff<4)
	{      
		if(docs.friendrequests.length>pos)
		   {  
		       loader1(pos,docs.friendrequests.length);	   
		       socket.emit('prequests',arr,pos);
		        pos=docs.friendrequests.length;	   
		        console.log('it was called'+pos);	   
		   }
	}
else
	{        var target=pos+4;
	         if(pos<docs.friendrequests.length)
		{
		loader1(pos,target);
	         pos=target;
		console.log("hey"+pos)	
	         socket.emit('prequests',arr,pos-4);
		
		}
	} 	
       
	function loader1(j,m){
             console.log("friendrequestsssssssssss"+docs.friendrequests);
	   for(i=j;i<m;i++)
		   {      
                         
                            
			 if(docs.friendrequests[i].displaypic)
		                           {  
			                  var x=fs.readFileSync(docs.friendrequests[i].displaypic,'utf8')
                                           
					}
	                                   var obj={
			                           name:docs.friendrequests[i].name,
			                           username:docs.friendrequests[i].username,
			                       	displaypic:x
					       }
				          arr.push(obj);
			
		            
			  
		   }
	                                  
	       
       }	

}	
});
		
function loader(n,arr)
{
	for(i=0;i<n;i++)
{
	if(docs.friendrequests[i].displaypic)
             
		{        
                          
                           console.log("hiiiiiiiiiiiiiiiiiii"+docs.friendrequests[i].displaypic);
		         var m=docs.friendrequests[i].displaypic;
			var x=fs.readFileSync(docs.friendrequests[i].displaypic,'utf8');
			var obj={
			name:docs.friendrequests[i].name,
			username:docs.friendrequests[i].username,
			displaypic:x
			}
                           arr.push(obj);
	              
			
		}
}
}	
socket.on('acceptrequests',(details)=>{
console.log(details);    
docs.friends.push({username:details.to});
docs.friendrequests.splice({username:details.to});
user.findOneAndUpdate({username:details.to},{$pull:{requestlist:{username:details.from}}},{new:true}).then((docs)=>{
    if(docs){console.log(docs);}else{}
},(err)=>{
    console.log(err);
});     
docs.save().then((docs)=>{
	if(docs)
		{
			console.log("saved");
		}
},(err)=>{console.log(err);});
user.findOneAndUpdate({username:details.to},{$push:{friends:{username:details.from}}}).then((docs)=>{
	if(docs){console.log("updated")}
},(err)=>{
 console.log(err);	
});
    
});
socket.on('file',(data)=>{

    console.log("fileeeeeeeee"+JSON.stringify(data));
    var filePath;
    var contentPath;
    var dir="./"+userdetail.username+"/";
    var file=dir+userdetail.username+"log.txt";
         function filewriter()
               {
               var read=fs.readFileSync(file,'utf8');
               read=parseInt(read);
               contentRead=read+1;
               contentName=userdetail.username+"content"+contentRead+".txt";
               contentPath=dir+contentName;
               docs.myposts.push({content:contentPath});      
               fs.writeFileSync(contentPath,data.content);   
               for(i=0;i<data.file.length;i++)
                   {  read=read+1;
                      fileName=userdetail.username+"file"+read+".txt";           
                      filePath=dir+fileName;
                      fs.writeFileSync(filePath,data.file[i]);
                      docs.myposts[docs.myposts.length-1].file.push(filePath);
                       docs.friends.forEach((v)=>{
                      console.log("hoooooo"+v);  
                      user.findOne({username:v.username}).then((docs)=>{
                      docs.posts.push({content:contentPath});      
                      docs.posts[docs.posts.length-1].file.push(filePath);
                      docs.save((docs)=>{if(docs){console.log("yooooo")}},(err)=>{console.log(err)});
                          
                      });  
                      });
                       
                   }     
                docs.save((docs)=>{if(docs){console.log("yooooo")}},(err)=>{console.log(err)});    
               if(data.file.length<=0)
                   {
                       fs.writeFileSync(file,contentRead);
                   }
                   else
                       {
                            fs.writeFileSync(file,read);
                       }
                  
               }
    fs.exists(file,function(exists){
       if(exists)
           {
                filewriter();
               
           }
        else
            {
               fs.writeFileSync(file,"0");
                filewriter();
            }
    });
//    var read=fs.readFileSync(file,'utf8');
//    if(read=="")
//        {
//            read=1;
//            
//        }
//    else
//        {
//    read=parseInt(read);
//    read=read+1;
//    console.log(read);	
//        }
//fs.writeFileSync('count.txt',read);	
//console.log(data);	
//var filename=id +'.txt';
//return filename;	
});
//send posts to the friends               
socket.on('showposts',(value)=>{    
 var postarr=[];
 var readypost={};       
 if(docs.posts)
     {
  var count=4;         
  while(count) 
  {
        if(docs.posts.length<=0)
          {
           return;   
          }
 var x=docs.posts.pop(); 
 docs.queuepost.unshift(x); 
    console.log(x);
 var content=fs.readFileSync(x.content,'utf8');
 readypost.content=content;    
  for(i=0;i<x.file.length;i++)
      {   var file2=fs.readFileSync(x.file[i],'utf8');
          postarr.push(file2);
      }
    readypost.postarr=postarr;
    console.log("readypostsssss"+JSON.stringify(readypost));
  docs.save((docs)=>{
  console.log("done")    
  },(err)=>{
      console.log(err);
  });
  }
  count--;   
    }
    else
        {
            
        }
});             
});		
}   				 
	socket.on('friendrequest',(friend)=>{
             
	console.log("user"+friend);
	var fiel="./"+friend.from+"/"+friend.from+".txt";	
	if(friend.to in users)	
	{
             users[friend.to].emit('immediateRequests',friend);
         }	
	user.findOneAndUpdate({username:friend.from},{$push:{requestlist:{username:friend.to}}},{upsert:true,new:true}).then((docs)=>{if(docs){console.log("found")}},(e)=>{console.log(e)});	
	user.findOneAndUpdate({username:friend.to},{$push:{friendrequests:{username:friend.from,displaypic:fiel,name:friend.sender}}},{upsert:true,new:true}).then((docs)=>{
	if(docs)
	{	
	  console.log(docs);
	}
	else
	{
	console.log("not updated");	
	}
	});
	});
         socket.on('chat',(data)=>{
         sub.subscribe('chat1');    
         console.log(data);
         pub.publish('chat1',data);  
         });
         sub.on('message',(message,channel)=>{
            socket.emit(message,channel); 
         });
	socket.on('disconnect',()=>{
	delete users[socket.username]; 	
	});
}
module.exports={
    pop
}