var friendsugession=function(socket,userdetail,docs){
                           var dost=docs;
                                function loop(n,docs,y)
		              {
				   
				  for(i=0;i<n;i++)
				   {
					
					   for(j=0;j<docs.length;j++)
						   {
							if(y[i].username===docs[j].username)
								{
									docs.splice(j,1);
								}
						   }
				   }
				     
	                            		
      			     }
		            
		              function resul(docs){
		              if(dost.friends)		     
			    { if(dost.friends.length>0)
			      {        loop(dost.friends.length,docs,dost.friends); 
				      console.log("friends");
				  
				      
			      }
			     console.log("friendso"+dost);
			    }
			       if(dost.friendrequests)	     
			       {if(dost.friendrequests.length>0)
				{ 
				   loop(dost.friendrequests.length,docs,dost.friendrequests);	
				       console.log("friendreq");	
				}
			       console.log(docs.friendrequests);	
			       }
			       if(dost.requestlist)	     
			     {  if(dost.requestlist.length>0)
				{ 
				   loop(dost.requestlist.length,docs,dost.requestlist);
			               console.log("friendszoooooooooooooooo");		
					
				}	
				     }
	                       var result=docs.filter((val)=>{		     
                                return val.username!=userdetail.username					          
                                 }).map((docs)=>{return x={username:docs.username,displaypic:docs.displaypic}});
//			       
			      return result;	     
                                 };
		
		
		
			   if(docs.workplace)
		     {  
                                 var workplaceid=docs.workplace.id;
			      user.find({'workplace.id':workplaceid}).then((docs)=>{
				if(docs)
				{        
				 	 var result=resul(docs);
					 result.push("workplace");
                                              socket.emit('friendSuggestions',result);
					
					
					
				}
				 else
				    {
				     console.log("no match found");  
				    }
			 },(e)=>{console.log(e)});    
		     }
		    user.find({'livesIn.id':docs.livesIn.id}).then((docs)=>{
			    if(docs!=null)
				    {     
					 var result=resul(docs);
					 result.push("workplace");
                                              socket.emit('friendSuggestions',result);
						
					  
				    }
			    else
				    {
					    console.log("not found");
				    }
		  },(e)=>{console.log(e);});
};