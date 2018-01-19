var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1/socialnetwork',(err,db)=>{
if(err)
 {
     console.log('cant connect');
 }
    
    else
        {
           console.log('connected to database ');
        }
    
});


module.exports={
    mongoose
 	
}