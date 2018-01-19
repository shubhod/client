var accept=function(socket,userdetail,docs){
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
}