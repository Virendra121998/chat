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
     	var template=jQuery('#message-template').html();
     	var ht=Mustache.render(template,{
     		from:message.from,
     		text:message.text,
     		createdAt:moment(message.createdAt).format('LT')
     	});
        jQuery('#messages').append(ht);
     	// var li=jQuery('<li></li>');
     	// li.text(`${message.from}:${moment(message.createdAt).format('LT')} ${message.text}`);
     	// jQuery('#messages').append(li);
     });
     // socket.emit('createMessage',{from:"Virendra",text:"its hot here"},function(data){
     // 	console.log("got it",data);
     // });
      socket.on('newLocationMessage',function(message){
      	var template=jQuery('#location-message-template').html();
      	var ht=Mustache.render(template,{
      		from:message.from,
      		u:message.u,
      		createdAt:moment(message.createdAt).format('LT')
      	});
      	jQuery('#messages').append(ht);
      	// var l2=jQuery('<li></li>');
      	// var a=jQuery('<a target="_blank">My current Location</a>');
      	// l2.text(`${message.from}: ${moment(message.createdAt).format('LT')}  `);
      	// a.attr('href',message.u);
      	// l2.append(a);
      	// jQuery('#messages').append(l2);
      });
      
      jQuery('#message-form').on('submit',function(e){
     	e.preventDefault();

     	socket.emit('createMessage',{
     		from:'User',
     		text:jQuery('[name=Message]').val()
     	},function(data){
     		console.log('Got it ',data);
     	});
     });	
     
      var l=jQuery('#location');
      l.on('click',function(){
      	if(!navigator.geolocation){
      		return alert('No geolocation');
      	}
      	navigator.geolocation.getCurrentPosition(function(position){
      		console.log(position);
      		socket.emit('createLocation',{
      			latitude:position.coords.latitude,
      			longitude:position.coords.longitude
      		});
      	},function(){
      		alert('Unable to fetch location');
      	});
      });

     
    