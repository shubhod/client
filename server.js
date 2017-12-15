var {io}=require('./express.js');
var path=require('path');
const crypto = require("crypto");
var fs=require('fs');
var hbs=require('hbs');
var multer =require('multer');
var myArgs = process.argv.slice(2);
var session = require("client-sessions");
var upload=multer({dest:'public/uploads/'});
var {user}=require('./database');
var {friend}=require('./database');
var express= require('express');
var {app}=require('./express.js');
var userdetail;
var crypt=[];
var {flag}=require('./database');
var post;
var users={};
var redis=require('redis');
var client=redis.createClient();
         client.on('connect',()=>{
         console.log("connected to redis");    
         });
app.use(express.static(__dirname+'/public'));
app.set('view engine','hbs'); 
var bodyParser = require('body-parser');
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here' 
}));
app.use(bodyParser.urlencoded({ extended: true }));
var storage=multer.diskStorage({
  destination: function(req, file,callback){
  callback(null, './uploads');
  },
  filename: function(req, file, callback){
  callback(null,file.fieldname+ '-' + Date.now());
  }
});
var upload = multer({storage : storage }).array('test[image]',2);
app.post('/api/photo',function(req,res){
	
         res.redirect('/user1');          
});
app.get('/form',(req,res)=>{
res.sendFile(__dirname+'/from.html');	
});
app.get('/form',(req,res)=>{
res.sendFile(__dirname+'/from.html');
});
app.post('/signin',(req,res)=>{ //saving the userdetails to the database from the registration page
   console.log(req.body);	
    var newuser= new user({
    name:req.body.name,
    email:req.body.email,
    username:req.body.username,    	    
    password: req.body.password,
    phone:req.body.phone 
});
    
   req.session.user1=req.body;
   console.log(req.body);	
   newuser.save(function (err) {
  if (err){
    console.log(err);
  } else {
    console.log('meow');
  }
}); 
client.set(req.body.username,req.body.username,(err,rply)=>{
    console.log(rply);
    if(err)
        {
            console.log(err);
        }
});                                    //saving details to redis
res.redirect('/details');

});
app.post('/login',(req,res)=>{
user.findOne({username:req.body.username}).then((docs)=>{
	if(docs.password===req.body.password)
		{
			
		req.session.user1={username:req.body.username};
		console.log("userdetail"+req.session.user1 );	
		res.redirect('/user1');	
		}
	else{
		res.send("not found");
	}
	
});	
});
app.get('/',(req,res)=>{
res.sendFile(__dirname+'/registration.html');//sending registration page
});
app.use(function(req,res,next){	
userdetail=req.session.user1;	
next();	
});
app.use('/details',function(req,res,next){
   	
   if(req.session && req.session.user1)
	{
	
	   next();	
	}
else
    {
	    res.redirect('/');
    }
	
      		
	});	

app.get('/displaypic',(req,res)=>{
res.sendFile(__dirname+'/displaypic.html');	
//io.on('connection',(socket)=>{	
//console.log("connected");
//});	
});
app.post('/submitDetails',(req,res)=>{
res.redirect('/displaypic');	
});
app.get('/details',(req,res)=>{    
res.sendFile(__dirname+'/details.html');
flag.findOneAndUpdate({},{$inc:{count:1}},{upsert:true,new:true}).then((docs)=>{
    req.session.user1[count]=docs.count;
user.findOneAndUpdate({username:userdetail.username},{count:docs.count},{upsert:true}).then((docs)=>{
       if(docs){
           
           console.log(docs);
       }
       else
           {
               console.log("not found");
           }
       
   },(err)=>{
       console.log(err);
   });     
}); 
       console.log("SESSIONDETAILS"+JSON.stringify(req.session.user1.count));
});
app.use(function(req,res,next){         
   if (req.session && req.session.user)
   { // Check if session exists
    // lookup the user in the DB by pulling their email from the session
    user.findOne({_id: req.session.user._id }, function (err, user){
      if (!user){
       next();
        
      } else{
        req.user=user;	      
      }
    });
  }
next();        
 });
app.get('/user1',function(req, res){
post=0;	
res.sendFile(__dirname+'/user.html');
console.log("user1"+req.session);				
});

             app.get('/profile',function(req,res){		
             res.sendFile(__dirname + "/profile.html");
		    
	       
             });
                          

var counte=0;                       
io.on('connection',(socket)=>{
counte=counte+1;
if(userdetail)
{ 
socket.username=userdetail.username;	   
users[socket.username]=socket;
var dir = './'+userdetail.username;

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
client.rpush(userdetail.username,details.to);
client.rpush(details.to,userdetail.username);    
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
	socket.on('disconnect',()=>{
	delete users[socket.username]; 	
	});    
});
io.on('connection',(socket)=>{
             var pub=redis.createClient();
         var sub=redis.createClient();
         socket.on('c',(data)=>{
         //sub.subscribe('chat1');    
           console.log(data);
             socket.emit('h',data);
        // pub.publish('chat1',data);  
         });
//         sub.on('message',(message,channel)=>{
//            socket.emit(message,channel); 
//         });
});


	

//          io.on('connection',(socket)=>{	
//          console.log("connected");		    
//          socket.on('message1',(data)=>{
//        user.findOne({_id:}).then((docs)=>{    
//        docs.posts.push({post:data});                
//        docs.save((err)=>{
//            if(err)
//                {
//                    console.log("not saved");
//                }
//            else
//            {
//                console.log("saved");
//            }
//            
//        });                
//        });
//        io.emit('message2',data);      
//         console.log(userDetail.name+"userDetail");        
          
//        });
         		 		 
//          socket.on('disconnect',()=>{   
//          console.log("disconnect");
//});     
//});

//           user.findOne({name: username}).then((docs)=>{
//           docs.followers.push({name:data.name});
//           docs.save();
//           });
//           console.log(data);    
//           socket.emit('message1',{
//           data1:data.name       
//           });       
//           console.log(userDetail);
//             console.log(docs);
//             docs.location.geo.push(data.latitude,data.longitude);
//             console.log(docs);   

//     user.geoNear({
//     type:'Point',
//     coordinates:[data]         
//     },{
//     Spherical:true,
//     maxDistance:2000});
//});
//});


//
//




//
//if(req.files)
//		{
//		upload(req,res,function(err){
//	          console.log(req.files);		 
//		 console.log(req.files[0].path);			 
//user.findOneAndUpdate({_id:req.session.user1.username},{  
//  profilepicture:{
//  filename:req.files[0].filename, 	       
//  path:req.files[0].path
//  },      	
// },{upsert:true}).then((docs)=>{
//	     if(!docs)
//	       {
//		res.send("not updated"); 
//		console.log("not updated");       
//	       }
//                      else
//		     {
////			    console.log(docs);
//		     }                                               
//	 });
//		
//	         if(err) 
//		{
//		return res.end("Error uploading file.");
//		}
//		 res.end("File is uploaded");	
//	         });
//		}
 
