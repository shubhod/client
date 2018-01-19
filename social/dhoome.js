
var map =new Map();
var count=0;
var stack=require('./dfs.js');
var queue=function(e){
 this.arr=[];  
this.enqueue=function(e){
  this.arr.unshift(e);           
};
this.dequeue=function(){
    return this.arr.pop();
};
this.Empty=function(){
if(this.arr.length==0)
       {
          return true;
       }
       else
       {
           return false;
       
       }  
};
};
var q=new queue();
var addVertex=function(v){
    
   this.list=map.set(v,[]); 
   count++;
};
var addEdge=function(v1,v2){
    addVertex.call(this);
    this.list.get(v1).push(v2);
       
};
//var search=function(startElement){
//    addVertex.call(this);
//    this.visited=[];
//    this.cycle=0;
//    for(i=0;i<4;i++)
//        {
//            this.visited[i]=false;
//        }
//    this.visited[startElement]=true;
//    q.enqueue(startElement);   
//    while(!q.Empty())
//        {
//            var eliminated=q.dequeue();
//             this.list.get(eliminated).forEach((v)=>{
//                 if(this.visited[v]==false)
//                     {
//                         q.enqueue(v);
//                         this.visited[v]=true;
//                     }
//                 else
//                 {      
//                        this.cycle++; 
//                        
//                 }
//             });
//    
//    
//        }
//    
//    
//    
//this.print=function(){
//    console.log("cycle"+this.cycle);
//    console.log(map);
//     console.log("dsadasd"+this.visited); 
//}
//
//
//};
var x=new stack();
var dfs=function(elem){
addVertex.call(this);    
var visited=[];
    for(i=0;i<count;i++)
        {
            visited[i]=false;
            
        }
x.push(elem);
while(!x.Empty())
{
      var top=x.get();
      visited[top]=true;
      var nodes=this.list.get(top);
      var got=false;
      if(nodes.length<1)
          {
           
            var elem=x.pop();
            console.log(elem);  
          }
     else
         {
            for(i=0;i<nodes.length;i++)
          {   
              if(visited[nodes[i]]==false)
                  {  got=true;
                     parent[nodes[i]]=top
                     visited[nodes[i]]=true;   
                     x.push(nodes[i]);  
                     break;
                  }
              
            
          }
    if(!got)
        {
          var elem=x.pop(); 
          console.log(elem);    
        }
         }
       
}
 this.print=function(){
    console.log(map); 
}     
    
};
var vertex1=new addVertex(0);
var vertex2=new addVertex(1);
var vertex3=new addVertex(2);
var vertex4=new addVertex(3);
var vertex5=new addVertex(8);
var vertex6=new addVertex(9);
var vertex7=new addVertex(11);
var vertex7=new addVertex(22);
var vertex8=new addVertex(23);
var vertex9=new addVertex(25);
var vertex10=new addVertex(26);
var vertex11=new addVertex(27);
var edge1=new addEdge(0,1);
var edge2=new addEdge(0,2);
var edge3=new addEdge(1,2);
var edge5=new addEdge(2,3);
var edge6=new addEdge(1,8);
var edge7=new addEdge(8,9);
var edge10=new addEdge(3,11);
var edge11=new addEdge(9,1);
var edge12=new addEdge(11,8);
var edge12=new addEdge(8,23);
var edge13=new addEdge(8,22);
var edge14=new addEdge(23,25);
var edge15=new addEdge(25,26);
var edge16=new addEdge(26,27);
var edge17=new addEdge(27,25);
var search=new dfs(0);
search.print();

