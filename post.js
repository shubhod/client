var fs=require('fs');
var {user}=require('./database.js');
var {send}=require('./send.js');
var post=function(socket,userdetail,docs){
    var online=userdetail.usename+'online';
    console.log("postfunction called");
    socket.on('file',(data)=>{
    var b = new Buffer(data.file[0], 'base64');
    fs.writeFileSync('./shubh/deep.jpg',data.file[0]);
    var s = b.toString(); 
    console.log(s);
    console.log(data.username);
    send(userdetail,docs,data);
    //send posts intantly to the friends if online
//    var filePath;
//    var contentPath;
//    var dir="./"+userdetail.username+"/";
//    var file=dir+userdetail.username+"log.txt";
//    function filewriter(dir,file,docs,username)
//    {
//               var read=fs.readFileSync(file,'utf8');
//               read=parseInt(read);
//               contentRead=read+1;
//               contentName=username+"content"+contentRead+".txt";
//               contentPath=dir+contentName;      
//               fs.writeFileSync(contentPath,data.content);
//               if(!docs.online)
//                   {
//               docs.myposts.push({content:contentPath});
//               for(i=0;i<data.file.length;i++)
//                   {  read=read+1;
//                      fileName=username+"file"+read+".txt";           
//                      filePath=dir+fileName;
//                      fs.writeFileSync(filePath,data.file[i]);
//                      docs.myposts[docs.myposts.length-1].file.push(filePath); 
//                   }
//                            docs.save().then((docs)=>{console.log(docs)},(err)=>{console.log(err)});   
//                            console.log('read'+contentRead);
//                            console.log(file);
//                            fs.writeFileSync(file,contentRead);
//                            if(data.file.length)
//                                {
//                                    fs.writeFileSync(file,read);   
//                                }
//                   }
//              else
//                  {
//               docs.oldposts.push({content:contentPath});
//               for(i=0;i<data.file.length;i++)
//                   {  read=read+1;
//                      fileName=username+"file"+read+".txt";           
//                      filePath=dir+fileName;
//                      fs.writeFileSync(filePath,data.file[i]);
//                      docs.myposts[docs.myposts.length-1].file.push(filePath); 
//                   }
//                            docs.save().then((docs)=>{console.log(docs)},(err)=>{console.log(err)});   
//                            console.log('read'+contentRead);
//                            console.log(file);
//                            fs.writeFileSync(file,contentRead);
//                            if(data.file.length)
//                                {
//                                    fs.writeFileSync(file,read);   
//                                }
//                
//                      
//                  }
//                       
//               
//                         
//    }
//    fs.exists(file,function(exists){
//       if(exists)
//           {
//                var username=userdetail.username;
//                filewriter(dir,file,docs,username);
//               
//           }
//        else
//            {  
//               fs.writeFileSync(file,"0");
//               var username=userdetail.username;
//                filewriter(dir,file,docs,username);
//            }
    });
    
    // send the posts to your friends 
      docs.friends.forEach((v)=>{
      user.findOne({username:v.username}).then((docs)=>{
      var dir="./"+v.username+"/";
      var file=dir+v.username+"log.txt";
      console.log(dir);
      var username=userdetail.username;
      filewriter(dir,file,docs,username);          
      });    
      });
	
//});  
};
module.exports={
    post
};