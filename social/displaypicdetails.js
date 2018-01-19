var fs=require('fs');
var Jimp = require("jimp");
var {user}=require('./database.js');
var submitpic=function(socket,userdetail){
socket.on('displaypic',(data)=>{
let base64Image=data.split(';base64,').pop();
var picture="./"+'public/'+userdetail.username+"/"+userdetail.username+".jpg";
fs.writeFileSync(picture,base64Image,{encoding:'base64'},function(err){
console.log('File created');
});
Jimp.read(picture, function (err, lenna){
    var picture="./"+'public/'+userdetail.username+"/"+userdetail.username+"small.jpg";
    if (err) throw err;
    lenna.resize(45,45).quality(90).write(picture); 
});
    console.log(data);
    x="./"+userdetail.username+"/"+userdetail.username+".txt";
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
var showpic=function(socket,userdetail,docs){
     if(docs.displaypic)
	  {  
               var fiel=fs.readFileSync(docs.displaypic,'utf8');
	      console.log("user route connected");	  
               socket.emit('displaypic',fiel);   
	  }
            socket.emit('username',{username:userdetail.username,name:docs.name});
    
};
module.exports={
submitpic,
showpic
}