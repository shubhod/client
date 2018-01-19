
var Stack=function(){
   
    var arr=[];
    var count=-1;
    this.push=function(e){
        count++;
        return arr.push(e);
    };
    this.pop=function(){
        count--;
        return arr.pop();
    };
    this.get=function(){
        return arr[count];
    };
    this.Empty=function(){
        if(count==-1)
            {
                return true;
            }
         else{
             return false;
         }
    }
};
module.exports = Stack;





