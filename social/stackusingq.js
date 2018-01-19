var queue=function(){
var arr=[];
var count=0;   
this.nq=function(x)
{
    arr.push(x);
    
}
this.dq=function()
{   var x;
    if(arr[count+1]==undefined)
    {
       arr[count]=null;
       count=null;
    }
    else
    { 
    x=arr[count];
    arr[count]=null;
    count++;
    
    }
   return x; 
}
this.get=function()
{   if(arr[count]!=null)
    {
        return arr[count];
    }
   else
       {
           return 0;
       }
    
}
this.isEmpty=function()
    {
        if(count!=null)
            {
              return true;
                
            }
        else
            {
                return false;
            }
        
    }
this.display=function()
{
    return arr;
}

}
var visited=[];
var q=new queue();
for(i=0;i<6;i++)
    {    
         q.nq(i);
         visited[i]=false;
        
    }
//while(1)
//    {  var elem=q.get();
//       if(visited[elem]==false){
//        var elem=q.dq();
//        console.log(elem);
//        visited[elem]=true;
//        q.nq(elem);
//       }
//     else{
//         break;
//     }
//        
//    }
console.log(q.get());
  var x=q.dq();
  q.nq(x);
    {
        console.log(q.display());
    }

