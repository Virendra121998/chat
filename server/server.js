const path=require('path');
const publicpath=path.join(__dirname+'./../public');
const express=require('express');
const socketio=require('socket.io');
const http=require('http');
const hbs=require('hbs');
const port=process.env.PORT||3000;
var app=express();
var server=http.createServer(app);
var io=socketio(server);
app.use(express.static(publicpath));

io.on('connection',(socket)=>{
	console.log('new user connected');
	
	socket.emit('newMessage',{
		from:"shagun@gmail.com",
		text:"Maggi khani hai aaj",
		createdAt:1234
	});
	
	socket.on('createMessage',(message)=>{
         console.log(message);
	});

	socket.on('disconnect',()=>{
		console.log('User disconeected');
	});
});

server.listen(port,()=>{
	console.log(`Started app on port ${port}`);
});
