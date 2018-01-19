var {io}=require('./express.js');
//var Jimp = require("jimp");
//var fs =require('fs');
//var x=fs.readFileSync('./shubh/shubh.txt','utf8');
//let base64Image = x.split(';base64,').pop();
//fs.writeFileSync('image.png',base64Image,{encoding:'base64'},function(err){
//console.log('File created');
//});
//Jimp.read("image.png", function (err, lenna){
//    if (err) throw err;
//    lenna.resize(45,45).quality(80).write("lena-small-bw.jpg"); 
//});
var {myArgs}=require('./express.js');
var {app}=require('./express.js');
app.get('/',(req,res)=>{
res.sendFile(__dirname+'/file.html');
});

io.on('connection',function(socket){
socket.on('yo',(data)=>{console.log(data)});
//ss(socket).on('file', function(stream, data){
//  var path='./shubh/shubhi'+x+'.jpg';
//  stream.pipe(fs.createWriteStream(path));
//  x++;
//  });
});
