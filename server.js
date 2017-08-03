
var {io}=require('./express.js');
var {user}=require('./database');
var express= require('express');
var {app}=require('./express.js'); 
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
res.sendFile(__dirname+'/registration.html');//sending registration page
app.post('/baby',(req,res)=>{ //saving the userdetails to the database from the registration page
    var newuser= new user({
    name: req.body.name,
    password: req.body.password,
    phone:req.body.phone,
    dob:{
        dd: req.body.day,
        mm: req.body.month,
        yy: req.body.year
    },
//  location:{
//                 geo:[req.body.location,req.body.location]
//           }    
                               
});       
    res.redirect('/user');  //redirecting  for login     
    console.log(req.body);
    newuser.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});    
});
});
    var  userDetail; 
    app.get('/user',(req,res)=>{  //login route
    res.sendFile(__dirname+'/login.html'); 
    app.post('/userlogin',(req,res)=>{
    user.find({         //finding user from database
        name:req.body.username 
    }).then((user)=>{
            userDetail=user;
            res.redirect('/user1');   //redirecting to users page
                    }); 
    });
    });
       app.get('/user1',(req,res)=>{   //users home route           
           
        var username=userDetail[0].name;//name of the user
        var userid=userDetail[0]._id;   
        res.sendFile(__dirname+'/user.html');
       
       });
        io.on('connection',(socket)=>{  //establishing socket connection to recive deatils directly from client and sending back to the client 
        //                
        socket.on('message1',(data)=>{
        user.findOne({_id:userid}).then((docs)=>{    
        docs.posts.push({post:data});                
        docs.save((err)=>{
            if(err)
                {
                    console.log("not saved");
                }
            else
            {
                console.log("saved");
            }
            
        });                
        });
        io.emit('message2',data);        
          
        });
 user.find({},(err,users)=>{
     if(err)
         {
             console.log("not possible");
         }
     else
     {      var data=[];
            users.forEach(function(user){
            data.push(user);    
         
        }); 
         socket.emit('message3',data);
     }    
     
     
 });     
    socket.on('disconnect',()=>{   
    console.log("disconnect");
});             
                         
});
           

 



 



//           user.findOne({name: username}).then((docs)=>{
//           docs.followers.push({name:data.name});
//           docs.save();
//           });
//           console.log(data);    
//           socket.emit('message1',{
//           data1:data.name       
//           });       
//           console.log(userDetail);
//             console.log(docs);
//             docs.location.geo.push(data.latitude,data.longitude);
//             console.log(docs);   








//     user.geoNear({
//     type:'Point',
//     coordinates:[data]         
//     },{
//     Spherical:true,
//     maxDistance:2000});
//});
//});