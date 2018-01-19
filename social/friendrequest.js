var {user}=require('./database');
var friendrqst=function(friend,socket){
         socket.on('friendrequest',(friend)=>{
         console.log("user"+friend);
	var fiel="./"+friend.from+"/"+friend.from+".txt";	
	user.findOneAndUpdate({username:friend.from},{$push:{requestlist:{username:friend.to}}},{upsert:true,new:true}).then((docs)=>{
         if(docs){console.log("found")}},(e)=>{console.log(e)});	
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
};

module.exports={
    friendrqst
}
