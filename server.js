var {io}=require('./express.js');
var path=require('path');
var fs=require('fs');
var hbs=require('hbs');
var multer =require('multer');
var session = require("client-sessions");
var upload=multer({dest:'public/uploads/'});
var {user}=require('./database');
var express= require('express');
var {app}=require('./express.js');
var userdetail;
var users={};
//app.set('views',path.join(__dirname,'views'));

app.use(express.static(__dirname+'/public'));
app.set('view engine','hbs'); 
var bodyParser = require('body-parser');
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
 
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
  res.redirect('/details');	
});
app.post('/login',(req,res)=>{
user.findOne({username:req.body.username}).then((docs)=>{
	if(docs.password===req.body.password)
		{
			
		req.session.user1={username:req.body.username};
		console.log("userdetail"+req.session.user1);	
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
res.sendFile(__dirname+'/user.html');
console.log("user1"+req.session);
				
});      	  
             app.get('/profile',function(req,res){		
             res.sendFile(__dirname + "/profile.html");
		    
	       
             });
                          

                           
io.on('connection',(socket)=>{ 
if(userdetail)
{
socket.username=userdetail.username;	   
users[socket.username]=socket;	 	 
}  	   
   socket.on('displaypic',(data)=>{	
   console.log(data);	   
   user.findOneAndUpdate({username:userdetail.username},{displaypic:data},{upsert:true,new:true}).then((docs)=>{
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
	  console.log("user route connected");
            socket.emit('displaypic',docs.displaypic);   
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
//			         console.log(JSON.stringify(result)+"result");   
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
		
	socket.emit('frequests',docs.friendrequests);			
});	
	}
	 
	socket.on('friendrequest',(friend)=>{
		
	console.log("user"+friend);
	if(friend.to in users)	
	{users[friend.to].emit('immediateRequests',friend);}	
	user.findOneAndUpdate({username:friend.from},{$push:{requestlist:{username:friend.to}}},{upsert:true,new:true}).then((docs)=>{if(docs){console.log("found")}},(e)=>{console.log(e)});	
	user.findOneAndUpdate({username:friend.to},{$push:{friendrequests:{username:friend.from,displaypic:friend.pic,name:friend.sender}}},{upsert:true,new:true}).then((docs)=>{
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
 