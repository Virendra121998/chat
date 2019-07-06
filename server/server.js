const path=require('path');
const publicpath=path.join(__dirname+'./../public');
const express=require('express');
const socketio=require('socket.io');
//var isRString=require('./utils/validate');
const {User}=require('./utils/Users');
const http=require('http');
const hbs=require('hbs');
const {m}=require('./utils/message');
const {generatelocation}=require('./utils/location');
const port=process.env.PORT||3000;
var app=express();
var server=http.createServer(app);
var io=socketio(server);
app.use(express.static(publicpath));
var users=new User();

io.on('connection',(socket)=>{
	console.log('new user connected');
	
	

	socket.on('join',(params,callback)=>{
		if((typeof params.name)==='string' && params.name.trim().length >0 && (typeof params.Room)==='string' && params.Room.trim().length >0){
		   
		socket.join(params.Room);
		users.removeUser(socket.id);
		users.addUser(socket.id,params.name,params.Room);
        io.to(params.Room).emit('getUserList',users.getUserList(params.Room));
        socket.emit('new',m('Admin','Welcome to chat app'));
	    socket.broadcast.to(params.Room).emit('newUser',m('admin',`${params.name}`));
		callback();
		}
		else{
			callback('Room And Name required');
		}

	});
	socket.on('createMessage',(message,callback)=>{
         var user=users.getUser(socket.id);
         if(user){
         io.to(user.room).emit('newMessage',m(user.name,message.text));
         callback('This is from server');
        } 
	});

	socket.on('createLocation',(coords)=>{
		var user=users.getUser(socket.id);
		if(user){
		io.to(user.room).emit('newLocationMessage',generatelocation(user.name,coords.latitude,coords.longitude));
	    }
	});
	socket.on('disconnect',()=>{
		console.log('User disconnected');
		var user=users.removeUser(socket.id);
		if(user){
			io.to(user.room).emit('getUserList',users.getUserList(user.room));
			io.to(user.room).emit('newMessage',m('Admin',`${user.name} has left `));
		}
	});
});


server.listen(port,()=>{
	console.log(`Started app on port ${port}`);
});
