//var graph=function()
//{   
//     this.vertices=[];
//     this.edges=[];
//     this.noOfedges=0;
//}
//graph.prototype.add=function(people)
//{
//             this.vertices.push(people);
//    
//    
//}
//graph.prototype.addedge=function(name1,name2)
//{
//    
//    
//    
//
//var map=function()
//{
//    this.collection={};
//    this.count=0;
//    this.size=function(){
//        return this.size;
//    }
//  
//    this.set=function(key,[]){
//    this.collection[key]=(value);
//    this.count++;    
//    }
//    this.get=function(key){
//        return this.collection[key];
//    }
//    this.add=function(key,value)
//    {  if(key)
//        { this.collection[key].push(value);}
//      
//          
//    }
//    
//    
//}
//var map1=new map();
//map1.add(1,'shubhodeep');
//map1.add(2,'paul');
//map1.get();
var map=new Map;
var  Queue=function(){
this.arr=[];    
this.enqueue=function(x){
    return this.arr.unshift(x);
}
this.dequeue=function(x){
    return this.arr.pop();
}
this.isEmpty=function(){
    if(this.arr.length==0)
       {
          return true;
       }
       else
       {
           return false;
       
       }
 this.qelements=function()
 {
    return this.arr;
 }
}
};
var q = new Queue();
var count=1;
 var addvertex=function(x)
 {   
      this.list=map.set(x,[]);
      count=count+1;
     
 }
 var addedge=function(x,y)
 {      addvertex.call(this);
        this.list.get(x).push(y);   
        this.list.get(y).push(x);
 }
 var print=function(){
      addvertex.call(this);
      console.log(this.list.keys());
//     console.log(this.list.get(3)[1]);
     
 }
 var search=function(startingvertex)
 {    addvertex.call(this);
      var visited=[];
     for(i=0;i<count;i++)
         {
             visited[i]=false;
         }
  
     q.enqueue(startingvertex);
     visited[startingvertex]=true;
      while(!q.isEmpty())
          {
              var eliminated=q.dequeue();
              console.log("eliminated"+eliminated);
              for(i=0;i<this.list.get(eliminated).length;i++)
              {   
                  var x=this.list.get(eliminated)[i];
                  console.log("x"+x);
                   if(visited[x]==true)
                       {
                           console.log("cycle detected");
                           
                       }
                  if(visited[x]==false)
                  { 
                        q.enqueue(this.list.get(eliminated)[i]);
                        visited[this.list.get(eliminated)[i]]=true;

                  }
                 
              }
            
              
          }
         
     console.log(visited);
  console.log(map);
 }

 
 var vertex1=new addvertex(3);
 var vertex2=new addvertex(4);
 var vertex3=new addvertex(5);
 var vertex4=new addvertex(6);
 var vertex5=new addvertex(7);
 var vertex6=new addvertex(8);
 var vertex7=new addvertex(9);
 var vertex8=new addvertex(10);
 var  edge1=new addedge(3,4);
 var  edge2=new addedge(3,5);
 var  edge3=new addedge(4,6);
 var  edge4=new addedge(5,6);
 var  edge5=new addedge(4,7);
 var  edge6=new addedge(7,8);
 var  edge7=new addedge(5,8);
 var  edge8=new addedge(8,9);
 var  edge9=new addedge(9,10);
 console.log(map.get(3));
  console.log(map.get(4));
var search1=new search(3);
var print1 =new print();
