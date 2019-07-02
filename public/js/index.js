var socket=io();
         socket.on('connect',function(){
         console.log('connected to server');

         socket.emit('createMessage',{
            to:"vir@gmail.com",
            text:"ok aaj maggi hi khate hai",
            createdAt:345
         });
     });
         
     socket.on('disconnect',function(){
     console.log('disconnected from server');
 });
     socket.on('newMessage',function(Message){
         	console.log("Message is ",Message);
         });
