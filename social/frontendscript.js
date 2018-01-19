<script>	
var socket= io();         
socket.on('connect',()=>{
console.log("connected");          
getposition();    
  function getposition(){
      if(!navigator.geolocation)
      {
          console.log("mwkmvlw");
      }
      else
          {              
           navigator.geolocation.getCurrentPosition((data)=>{
             console.log(data.coords.latitude);
           var position=
               {
                   latitude:data.coords.latitude,
                   longitude:data.coords.longitude
               }
               
         },()=>{
               console.log("not possible");
                 
               });          
              
          }
  }  
    $("#submit").on('click',()=>{
        var val=$("#msg").val();
     
    socket.emit('message1',val);
    });
    socket.on('message2',(data)=>{
        
    console.log(data+'message2');
     });
 socket.on('message3',(data)=>{
 console.log(data);	     
 var x=0;
 data.forEach((val)=>{
 var source = $("#entry-template").html();
 var template = Handlebars.compile(source);	
 var context={name:val.name};
 var html=template(context);	 
 $('#carousel').append(html);
    }); 
      $(document).ready(function() { 
    // Using default configuration 
    $('#carousel').carouFredSel(); 
     // Using custom configuration 
    $('#carousel').carouFredSel({ 
        items                : 4, 
        direction            : "up", 
        scroll : { 
            items            : 1, 
            easing           : "elastic", 
            duration         : 500, 
            pauseOnHover     : true 
        } 
    }); 
}); 
});
$('#profile').on('click',()=>{
socket.emit('profile',{
	
});	
});	
});  	
 </script> 
 <style>
.box{
margin-left:100px;	
width:40px;
border-color:red;
border-style:solid;
height:40px; 
}
#div1{
margin-left:100px;	
width:40px;
border-color:red;
border-style:solid;
height:40px; 	 
}
#div2{
margin-left:100px;	
width:40px;
border-color:red;
border-style:solid;
height:40px; 	 
 }
#div3{
margin-left:100px;	
width:40px;
border-color:red;
border-style:solid;
height:40px; 	 
}	 
</style>
<script id="entry-template" type="text/x-handlebars-template">
 <div class="box">
<p>{{name}}</p>
 </div>
</script>
<!--<script src="/socket.io/socket.io.js "></script>-->