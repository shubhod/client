var socket=io();
socket.emit('show');
socket.on('giveposts',(data)=>{
var arr=[];
arr.push(data);
console.log(data);
//if(data.posts.file)
//{
//var x='<img class="resize" src'+'='+data.posts.file[0]+'>';
//$('.posts').append('<div class="box">'+x+'</div><br><br>');  
//}

});