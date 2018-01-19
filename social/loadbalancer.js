var http = require('http'),
httpProxy = require('http-proxy');
var request = require('request');
var session = require("client-sessions");
var proxy = require('express-http-proxy');
var app = require('express')();
var cookieParser = require('cookie-parser');
var url = require('url');
var fs=require('fs');
var cookie = require('cookie');
var  redis=require('redis');
var client=redis.createClient();
var x=['http://localhost:4001','http://localhost:4002','http://localhost:4003','http://localhost:4004','http://localhost:4005'];

var i;
app.use((req,res,next)=>{
     i=fs.readFileSync('./i.txt','utf8');
     next();
});  
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here' 
}));
var m=0;
app.use(function(req,res,next){
    
    if(req.session.user1)
        
        {   var name=req.session.user1.username;
            if(req.session.user1.serverno)
                {
                  m=req.session.user1.serverno; 
                 console.log("serverno:"+req.session.user1.serverno);
                }
              else
                  {   console.log('iiiiiii'+i);
                
                      console.log('heyyyyy'+x[m]+' '+m);
                       req.session.user1={
                         username:name,
                         serverno:m
                     }
                     i=m;
                     fs.writeFileSync('./i.txt',i);
                  }
                 
        }
    else
        {    
            i=parseInt(i);
            m=(i+1)%5;
            console.log('hooo'+i+' '+m);
            i=m;
            
            fs.writeFileSync('./i.txt',i);
        }
    req.k=m;
      
    next();
});
app.use('/',function(req, res) {
  console.log(x[req.k]);    
  var a=x[req.k]+req.url;
  req.pipe(request(a)).pipe(res);  
});
app.listen(8000,()=>{
console.log("server is up");
});
//var proxy=httpProxy.createProxyServer();
//http.createServer(function(req,res){
//     var cookies=cookie.parse(req.headers.cookie || '','random_string_goes_here');
//    if(cookies.name)
//        {
//            proxy.web(req,res,x[cookies.name]);
//        }
//    if(cookies.session)
//        {     var v=req.headers.cookie;
////              var y=cookieParser.signedCookies(v, 'random_string_goes_here');
//             console.log(cookies.session); 
////        console.log(y);            
//        }
//    else
//        {   
//            proxy.web(req,res,x[(i+1)%2]);
//            var m=(i+1)%2;
//            res.setHeader('Set-Cookie', cookie.serialize('name',m,{ 
//            httpOnly: true,
//            maxAge: 60 * 60 * 24 * 7 
//            }));
//            i++;            
//        }
//}).listen(8000);




