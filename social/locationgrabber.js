        var {user}=require('./database');
        var locationgrab=function(socket,userdetail){
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
         };
       module.exports={
           locationgrab
       }