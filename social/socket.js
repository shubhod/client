var userdetail=require('./server.js');
var {user}=require('./database');
var {friend}=require('./database');
var {flag}=require('./database');
var {friendrqst}=require('./friendrequest');
var redis=require('redis');
var  {locationgrab}=require('./locationgrabber.js');
var  {post}=require('./post.js');
var {submitpic}=require('./displaypicdetails.js');
var {showpic}=require('./displaypicdetails.js');
var {notifyrqst}=require('./notifyrqst');
var {friendsugession}=require('./sugessionOFriends.js');
var {accept}=require('./acceptrequests.js');
var fs=require('fs');
var {showpost}=require('./showpost.js');
var {subscribtion}=require('./subscribtion.js');
var pop=function(socket,userdetail)
{
  if(userdetail)
{ //subscribtion to a particular channel for intant    messaging  and post
  subscribtion(userdetail,socket);
  
  var dir ='./'+userdetail.username;
   
   if (!fs.existsSync(dir))
   {
    fs.mkdirSync(dir);
   }
   // collect location from user from location grabber.js{locationgrabber.js}
  locationgrab(socket,userdetail); 
     
    
   //retrive the display pic from the client and store into database{displaypicdetails.js}         
   submitpic(socket,userdetail); 
    
    //send friend request two any one 
    friendrqst(friend,socket);
}  	   
           
var count=0; 
//show post to friends when offline by retriving from database
showpost(socket,userdetail); 
if(userdetail)
{
user.findOne({username:userdetail.username}).then((docs)=>{
//subscribe to a perticular channel for instant messaging
    
// reciving posts in the form of file from the user and storing it into the database  
post(socket,userdetail,docs);    
    
//show the display pic from the server{displaypicdetails.js}
showpic(socket,userdetail,docs);

// suggesting friends    
friendsugession(socket,userdetail,docs);
 
   
// accept friend requests 
accept(socket,userdetail,docs);
     

//notifying if any friend request are there or not        
notifyReqst(socket,userdetail,docs);
    
});		
}   				 

};   
	
module.exports={
pop
}