var socket=io();
var flag=$('.notificationbox');
var envo=$('#envo');
var frnd=$('#frnd');
var bell=$('#bell');
var j=0;	
function divgenerator(frnd,data)
{        
	for(i=0;i<data.length;i++)
{
	frnd.append('<div class="insideNotification">');
	
	
}
	       frnd.children('.insideNotification').each(function(){
		
		$(this).append('<div id=data>'+data[j].name+'<button id="confirm">confirm</button>'+'<button id="delete">delete</button>'+'</div>');
		$(this).children('#data').children().attr("value",data[j].username);
		$(this).append('<img id="fd">'+'<hr>');
		$(this).children('img').attr('src',data[j].displaypic);
	          j++;
	});
	  
}
function divprepender()
{
   frnd.children('.insideNotification').each(function(){
	$(this).prepend('<div class="insideNotification">');
	 return false;
   });
	
};
console.log("connected");
$(document).ready(()=>{
var count=1;	
$('#r1').on('click',function(){
//seenkyahai();	
console.log("count"+count);
   if(count!=0)
 {
  flag.show(); console.log("show");
  count=0;
	 
  return false;	 
 }	
  if(count==0)
  {       console.log("inside");
	 flag.hide();
          count=1;
          
  }
});
socket.on('notification',()=>{
$('#r2').on('click',function(){
 console.log("count"+count);
     if(count!=3)
 {
  flag.show(); console.log("show");
  count=3;
 for(i=0;i<4;i++)
{
 
}
  return false;	 
 }	
  if(count==3)
  {       console.log("inside");
	 flag.hide();
          count=2;
          
  }
	 
});	
});	
	
socket.on('frequests',(data)=>{
console.log(data);	
frnd.html('<div class="fbanner">friend requests</div>');	
divgenerator(frnd,data);	
});
socket.on('prequests',(data,pos)=>{
console.log(data);	
prequestor(frnd,data,pos);	
function prequestor(frnd,data,pos){
var count=1;	
var x=frnd.children('.insideNotification');	
console.log(x[pos-1]);	
data.forEach(function(){
	$(x[pos-1]).after('<div class="insideNotification"></div');

});
var x=frnd.children('.insideNotification');		
  var newpos=pos+data.length;
  var j=0;	
  while(pos<newpos)
	  {
		 $(x[pos]).append('<div id=data>'+data[j].name+'<button  id="confirm">confirm</button>'+'<button id="delete">delete</button>'+'</div>');
		 $(x[pos]).children('#data').children().attr("value",data[j].username);
		$(x[pos]).append('<img id="fd">'+'<hr>');
		$(x[pos]).children('img').attr('src',data[j].displaypic); 
		  pos++;
		  j++;
	  }	
}	
});	
socket.on('immediateRequests',(data)=>{
console.log(data);
if(frnd.children().length<2)
{
	frnd.append('<div class="insideNotification"></div>');
	var n=$('.insideNotification');	
         n.append('<div id=data>'+data.from+'<button  id="confirm">confirm</button>'+'<button id="delete">delete</button>'+'</div>');
	n.append('<img id="fd">'+'<hr>');
	n.children('img').attr('src',data.pic);		
}
else{
frnd.children('.insideNotification').each(function(){
	$(this).before('<div class="insideNotification"></div>');	
	console.log($(this));
	return false;
   });
         frnd.children('.insideNotification').each(function(){	
         $(this).append('<div id=data>'+data.from+'<button  id="confirm">confirm</button>'+'<button id="delete">delete</button>'+'</div>');
	
		$(this).append('<img id="fd">'+'<hr>');
		$(this).children('img').attr('src',data.pic);
	         return false;
	
});	
	
}	
});
socket.emit('showposts');    
    
$('#r3').on('click',function(){
socket.emit('giveme',0);	
console.log("count"+count);
     if(count!=4)
 {
  flag.show(); console.log("show");
  frnd.show();	 
  count=4;	 
  return false;	 
 }	
  if(count==4)
  {       console.log("inside");
	 flag.hide();
          count=5;
          
  }	
});	
$('body').on('click',function(e){
  
  var x=$(e.target);	
  if(x.attr("class")=='insideNotification'||x.prop("tagName")=="HR")
	  {
		  return false;
	  }
   count=8;	
   flag.hide();	
});
$('body').on('click',function(e){	
var x=$(e.target);	
if(x.attr('id')=="confirm"|| x.attr("id")=="delete")
{
  console.log(x.parent('#data'));	
  if(x.attr('id')=="confirm")
	  {
	     var acceptdetails={
		  from:$('.Rectangle_1 h1').attr("value"),
		  to:x.val()
		     
	     }	  
	     socket.emit('acceptrequests',acceptdetails);  
	  }

}
});	
});
    

socket.on('displaypic',(data)=>{ 
 $(document).ready(()=>{
   $('#img').attr("src",data);
   $('.Rectangle_1 #userdummy').hide();	 
	 
 });
});
socket.on('username',(data)=>{
console.log(data);	
$(".Rectangle_1 h1").html(data.name).attr("value",data.username);
});	

$('.postbutton').off().on('click',(e)=>{
	var arr=[];
	var x=$('#postbox').children('#x');
	for(i=0;i<x.length;i++)
		{
			
		arr.push($(x[i]).children('img').attr('src').toString());
			
		}
	         console.log(arr);
	         var post={
		content:$('#note').val(),
		file: arr
	         }
		
	         if(arr.length<=0 && post.content=="")
			{
			       toggleOverlay();
			}
	            else
			   {
                            
	               		        socket.emit('file',post);
				        for(i=0;i<arr.length;i++)
					{
					       $('#x').remove();
					}
			     
	       
			   }
    
}); var user;
     setTimeout(function(){  user=$(".Rectangle_1 h1").attr("value")+'post';
                             socket.on(user,(data)=>{
                             console.log(JSON.stringify(data));    
                           }); 
                          },300);
   
   console.log(user);

   


var count=0;
var openFile = function(file) {		
   $('#postbox hr').after('<div id="x"style="height:110px">' + '<img  id="im" >'+'</div>');	
    var input = file.target;
	if(input.files[0]==undefined)
		{
		     $('#x').remove(); 	
		}
     var x= input.files[0].type.split('/');
     	
       console.log(x);	
       if(x[0]=='image')
	       {          var s="";
		         console.log(x);
		         var reader = new FileReader();
     			reader.readAsArrayBuffer(input.files[0]);	
    			reader.onload = function()
			{   
			    var u =new Uint8Array(this.result),j=0,
                               a =new Array(u.length);
                               while (j<a.length)                           
			   { 
				   a[j] = u[j].toString(16);
				   if(j<2)
					   {
						    s=s+a[j];
						   
					   }
				   j++;
				   
			   }
			     		
                                u = null; 
                                console.log(a);
			     console.log(s);	
				if(s=='8950'|| s=='4749'|| s=='ffd8')
					{
					var read=new FileReader();	
					read.readAsDataURL(input.files[0]);
					read.onload=function()
					{
				                  var x=$('#x');
					         $(x[x.length-1]).children('img').attr("src",this.result);
						
					}               
					}
			     
				           
    			}; 
		      
		      
	       }
	else
		{
			$('#x').html("<h1>file should be image type</h1>");
		}
  };


  function toggleOverlay()
 {
	var overlay = document.getElementById('overlay');
	var specialBox = document.getElementById('specialBox');
	overlay.style.opacity = .8;
	if(overlay.style.display == "block"){
		overlay.style.display = "none";
		specialBox.style.display = "none";
	} else {
		overlay.style.display = "block";
		specialBox.style.display = "block";
	}
		
				   }
			   
