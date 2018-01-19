var notifyrqst=function(socket,userdetail,docs){
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
}
module.exports={
notifyrqst
}