const path=require('path');
const publicpath=path.join(__dirname+'./../public');
const express=require('express');
const socketio=require('socket.io');
const http=require('http');
const hbs=require('hbs');
const {m}=require('./utils/message');
const {generatelocation}=require('./utils/location');
const port=process.env.PORT||3000;
var app=express();
var server=http.createServer(app);
var io=socketio(server);
app.use(express.static(publicpath));

io.on('connection',(socket)=>{
	console.log('new user connected');
	
	socket.emit('new',m('Admin','Welcome to chat app'));
	socket.broadcast.emit('newUser',m('admin','New User Joined'));

	socket.on('createMessage',(message,callback)=>{
         console.log(message);
         io.emit('newMessage',m(message.from,message.text));
         callback('This is from server');
	});

	socket.on('createLocation',(coords)=>{
		io.emit('newLocationMessage',generatelocation("Virendra",coords.latitude,coords.longitude));
	});
	socket.on('disconnect',()=>{
		console.log('User disconeected');
	});
});


server.listen(port,()=>{
	console.log(`Started app on port ${port}`);
});
