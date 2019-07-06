var socket=io();
         socket.on('connect',function(){
         console.log('connected to server');
         var params=jQuery.deparam(window.location.search);
         socket.emit('join', params, function(err){
         	if(err){
         		alert(err);
         		window.location.href='/';
         	}else{
         		console.log('No error');
         	}
         });
        
     });
      function scroll(){
         var messages=jQuery('#messages');
         var newMessage=messages.children('li:last-child');
         var clientheight=messages.prop('clientHeight');
         var scrollHeight=messages.prop('scrollHeight');
         var scrollTop=messages.prop('scrollTop');
         var newMessageHeight=newMessage.innerHeight();
         var lastMessageHeight=newMessage.prev().innerHeight();
         if(clientheight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight)
           messages.scrollTop(scrollHeight);     
       }  


     socket.on('new',function(mes){
     		var template=jQuery('#message-template').html();
     	    var ht=Mustache.render(template,{
     		from:mes.from,
     		text:mes.text,
     		createdAt:moment(mes.createdAt).format('LT')
     	});
        jQuery('#messages').append(ht);
     });
     socket.on('newUser',function(mes){
     		var template=jQuery('#message-template').html();
     	    var ht=Mustache.render(template,{
     		from:mes.from,
     		text:mes.text,
     		createdAt:moment(mes.createdAt).format('LT')
     	});
        jQuery('#messages').append(ht);
     });   
     socket.on('disconnect',function(){
     console.log('disconnected from server');
 });
     socket.on('getUserList',function(users){
     	var ol=jQuery('<ol></ol>');
     	users.forEach(function(user){
     		ol.append(jQuery('<li></li>').text(user));
     	});
     	jQuery('#users').html(ol);
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
        scroll();
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
      	scroll();
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

     
    