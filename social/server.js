var {io}=require('./express.js');
var {myArgs}=require('./express.js');
var path=require('path');
const crypto = require("crypto");
var fs=require('fs');
var hbs=require('hbs');
var multer =require('multer');
var session = require("client-sessions");
var upload=multer({dest:'public/uploads/'});
var {user}=require('./database');
var {friend}=require('./database');
var express= require('express');
var {app}=require('./express.js');
var n=require('./socket.js');
var userdetail;
var {posts}=require('./database.js');
var crypt=[];
var {posts}=require('./database.js');
var post;
var users={};
var redis=require('redis');
var client=redis.createClient();
         client.on('connect',()=>{
         console.log("connected to redis");    
         });
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','hbs'); 
var bodyParser = require('body-parser');
app.use(session({
  key:'jsessionid',
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
app.get('/form',(req,res)=>{
res.sendFile(__dirname+'/from.html');	
});

app.post('/signin',(req,res)=>{ //saving the userdetails to the database from the     registration page
    console.log(req.body);	
    var newuser= new user({
    name:req.body.name,
    email:req.body.email,
    username:req.body.username,    	    
    password: req.body.password,
    phone:req.body.phone,
});
var newposts=new posts({
      username:req.body.username  
});
newposts.save((err)=>{
console.log(err);
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
                                    //saving details to redis
res.redirect('/details');

});
app.post('/login',(req,res,next)=>{
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
console.log('i got a request'+myArgs);    
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
posts.findOneAndUpdate({username:userdetail.username},{online:1},{upsert:true,new:true}).then((docs)=>{
},(err)=>{console.log(err)});
});

app.get('/profile',function(req,res){		
res.sendFile(__dirname + "/profile.html");
});
var counte=0;                       
io.on('connection',(socket)=>{
    if(userdetail)
        {
         console.log(userdetail);
          n.pop(socket,userdetail);    
        }
  socket.on('disconnect',()=>{
  console.log('disconnected');    
  });
});
io.on('disconnect',()=>{
});
var x=2;
module.exports={
  x
};

	

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
 