var socket=io();
         socket.on('connect',function(){
         console.log('connected to server');

        
     });
      
     socket.on('new',function(mes){
     	console.log('Message from server', mes);
     });
     socket.on('newUser',function(mes){
     	console.log('Message to every other user',mes);
     });   
     socket.on('disconnect',function(){
     console.log('disconnected from server');
 });
     socket.on('newMessage',function(message){
     	console.log('Message from server is ',message);
     });
     
