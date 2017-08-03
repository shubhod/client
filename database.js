    var {mongoose}=require('./connection.js');
    var Schema=mongoose.Schema;
       var followSchema=new Schema({
      name:{
          type:String
          }, 
      id:String
        
    });
    var followerSchema= new Schema({
    name:
        {
        type:String
        },
        id:String    
        
    });
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
    var locationSchema= new Schema({
    geometry: {
    type: [Number],
    index: '2d',
    required:true    
    }
    });
    var postSchema=new Schema({
     name:String,
     post:{type:String}          
     });
    var user=new Schema({
    name:{
        type:String
    },
    phone:{type:String},
    dob:{
     dd:{type:Number} ,
     mm:{type:String },
     yy:{type:Number}      
    },
    address:{type:String},
    follows:[followSchema],    
    followers:[followerSchema],
        
    comments:[commentSchema],
    like:[likeSchema],
//    followedPosts:[followedPostSchema],     
    posts:[postSchema]   
           
    });
    var user=mongoose.model('user',user);
    module.exports={
        user
    }













        
//    location: {  
//    name: String,
//    geo: {
//    type: [Number],  // [<longitude>, <latitude>]
//    index: '2dsphere'      // create the geospatial index
//    }
//    },