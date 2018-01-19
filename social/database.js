    var {mongoose}=require('./connection.js');
    var validator=require('validator');
    var Schema=mongoose.Schema;
    var followedPostSchema= new Schema({
        name:
        {
            type:String
        },
        posts:{
            type:String
        }
    });
    var commentSchema= new Schema({
        name:{
            type:String
        },
        comment:{
            type:String
        }
    });
    var likeSchema=new Schema({
        name:String,   
    });  
     var postSchema=new Schema({
     username:String,
     name:String,
     content:String,
     file:[String],
     index:Number,
     seen:Number
     });
   
    var user=new Schema({
    username:{
	type:String    
    },
    email:{
	    type:String,
	    unique:true,
	    validate:{
             validator: validator.isEmail,
	    message:'{value} is not email'   	    
	    }
	     
    },
    count:0,
    phone:{type:Number},
    password:String,	    
    name:String,
    address:{type:String},
    friends:[{name:String,displaypic:String,username:String}],	 
    friendrequests:[{name:String,displaypic:String,username:String}],
    requestlist:[{username:String}],    
    location:{geo: { type: [Number], index:{type: '2dsphere', sparse: true}}},          
    profilepicture:{
      path:String,
      filename:String	  
    },
     displaypic:String,	    
     work:{name:String},       
     country:{name:String},       
     workplace:{name:String,id:String},   
     livesIn:{name:String,id:String},
     hometown:{name:String,id:String},
     parentPost:[postSchema],
     pointer:Number,
     contentCount:Number,
     fileCount:Number,
     personalPosts:[postSchema]
    });
   var postuser=new Schema({
    username:String, 
    myposts:[postSchema],
    online:Number,
    newposts:[postSchema],
    personalPosts:[postSchema],
    x:Boolean
   });    
    var friend=new Schema({
    name:String
    });
    var countSchema=new Schema({
        count:Number
    });
    var globalinstance=new Schema({
       comments:{name:String}
    });
    var  user=mongoose.model('user',user);
    var  posts=mongoose.model('postuser',postuser);
    var  commentinstanceSchema=new Schema({
      instance_id:String,
      commentholders:[String],
      commentFile:[String],
      likes:[{username:String,name:String,displaypic:String,count:Number}],    
    }); 
  module.exports={
        user,
        posts
    }
//    location: {  
//    name: String,
//    geo: {
//    type: [Number],  // [<longitude>, <latitude>]
//    index: '2dsphere'      // create the geospatial index
//    }
//    },