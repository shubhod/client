var front=-1;
var rear=-1
var a=[];
var isempty=function(){
    if(front==-1 && rear==-1)
        {
            return true;
        }
    else
        {
            return false;
        }
};
var enqueue=function(x){ 
if(isempty())
    {   
        front=0;
        rear=0;
        a[rear]=x;
    }
else
    if(front==(rear+1)%5)
     {   console.log("it is full");
//         console.log("front"+front);
         return;
     }
    else
        {    console.log(isempty());
             rear=(rear+1)%5;
            a[rear]=x;
        } 
};
var dequeue=function(){
var y;
if(isempty())
    {
          console.log("the queue isempty");
          return;
    }
    
else
    if(front===rear)
        {    console.log("equal");
             front=rear=-1;
        }  
else
    {    
        y=front;
        front=(front+1)%6;   
    }
    
return y;    
};
enqueue(4);
enqueue(5);
enqueue(6);
enqueue(8);
enqueue(7);
dequeue();
dequeue();
enqueue(8);
enqueue(7);
enqueue(8);
enqueue(7);
dequeue();
dequeue();
dequeue();
dequeue();
dequeue();
dequeue();
console.log('arr:'+a);
console.log('rear:'+rear);
console.log('front:'+front);
































