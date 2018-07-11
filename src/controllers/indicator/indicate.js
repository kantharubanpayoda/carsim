module.exports = function(io){
	//var db = require('../models/schema');
	//var config = require('../config/config');
	var log = require('../../lib/logger');
	var util = require('../../lib/util');

	var engine = {};
	// rooms which are currently available in chat
	var simulators = [];
	//An utility for getting current timestamp

io.sockets.on('connection', function (socket) {
	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(data){
		log.info('userid:'+data.userid+'adduser :to a new simulator :'+data.simid +'request');
		var timeStamp = util.getCurrentTimestamp();
		var name;
		var JSONobj = new Object();
		// store the username in the socket session for this client
		socket.userId = data.userid;
		// store the room name in the socket session for this client
		socket.simulators = data.simid;
		// add the client's username to the global list
		engine[name] = data.userid;
		// send client to socket.room
		socket.join(data.simid);
		// echo to client they've connected
		JSONobj = {"simid":socket.simid};
		//socket.emit('chatroom', JSONobj);
		// echo to socket.room that a person has connected to their room
		JSONobj = {"userid":data.userid, "simid":data.simid, "timestamp":timeStamp};
		
		// try{
		// 	var room = io.sockets.adapter.rooms[socket.simid];
		// 	var numberOfUsers = Object.keys(room).length;
		// 	console.log("Simulator  - Number of participants:"+numberOfUsers);
		// }
		// catch(err)
		// {
		// 	console.log("Simulator - error getting the participants");
		// }
	});
	
	
	// Engine ON/OFF info to Cockpit from the Simulator
	socket.on('engine',function(data){
		log.info('simid:'+data.simid+'userid:'+data.userid+'EngineStatus');
		var JSONobj = new Object();
		socket.broadcast.to(data.simid).emit('engine', data);
	});
	
	//Accessories status to be sent to Cockpit
	socket.on('accessories',function(data){
		log.info('simid:'+data.simid+'userid:'+data.userid+'accessories');
		var JSONobj = new Object();
		socket.broadcast.to(data.simid).emit('accessories', data);
	});

	// Lamp status to be sent to Cockpit
	socket.on('lamp',function(data){
		log.info('simid:'+data.simid+'userid:'+data.userid+'lamp');
		var JSONobj = new Object();
		socket.broadcast.to(data.simid).emit('lamp', data);
	});

	//Running status to be sent to Cockpit
	socket.on('speed',function(data){
		log.info('simid:'+data.simid+'userid:'+data.userid+'speed');
		var JSONobj = new Object();
		socket.broadcast.to(data.simid).emit('speed', data);
	});

	//Wifi ON/OFF status to be sent to Simulator
	socket.on('wifi',function(data){
		log.info('simid:'+data.simid+'userid:'+data.userid+'wifi');
		var JSONobj = new Object();
		socket.broadcast.to(data.simid).emit('wifi', data);
	});

	//BL ON/OFF status to be sent to Simulator
	socket.on('bl',function(data){
		log.info('simid:'+data.simid+'userid:'+data.userid+'Bluetooth');
		var JSONobj = new Object();
		socket.broadcast.to(data.simid).emit('bl', data);
	});

	//Media ON/OFF status to be sent to Simulator
	socket.on('media',function(data){
		log.info('simid:'+data.simid+'userid:'+data.userid+'media');
		var JSONobj = new Object();
		socket.broadcast.to(data.simid).emit('media', data);
	});

	//lock ON/OFF status to be sent to Simulator
	socket.on('lock',function(data){
		log.info('simid:'+data.simid+'userid:'+data.userid+'lock');
		var JSONobj = new Object();
		socket.broadcast.to(data.simid).emit('lock', data);
	});

	//currentstatus of simulator --> to sent to Simulator (Asking for status)
	socket.on('currentstatus',function(data){
		log.info('simid:'+data.simid+'userid:'+data.userid+'currentstatus');
		var JSONobj = new Object();
		socket.broadcast.to(data.simid).emit('currentstatus', data);
	});

	//currentstatus of simulator --> to sent to Simulator (Asking for status)
	socket.on('simstatus',function(data){
		log.info('simid:'+data.simid+'userid:'+data.userid+'simstatus');
		var JSONobj = new Object();
		socket.broadcast.to(data.simid).emit('simstatus', data);
	});


	socket.on('useradded',function(data){
		var time = util.getCurrentTimestamp();
		log.info('RoomID:'+data.roomid+'userId:'+data.userid+'useradded');
		var JSONobj = new Object();
		//send userremoved to update the clients
		JSONobj = {"userid":data.userid, "roomid":data.roomid};
		socket.broadcast.to(data.roomid).emit('useradded', JSONobj);
	});

	socket.on('newroomadded',function(data){
		log.info("new room added called");
		var time = util.getCurrentTimestamp();
		// log.info('RoomID:'+data.roomid+'newroomadded');
/*		var JSONobj = new Object();
		//send userremoved to update the clients
		JSONobj = {"userid":data.userid, "roomid":data.roomid};*/
		socket.broadcast.emit('newroomadded', data);
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
		var time = util.getCurrentTimestamp();
		console.log("Socket disconnected for user:"+socket.userid+"from SIM:"+socket.simid);
		// remove the username from global usernames list
		delete engine[socket.userid];
		// update list of users in chat, client-side
		io.sockets.emit('updateusers', engine);
		// echo globally that this client has left
		var JSONdisconnectinfo = new Object();
		JSONdisconnectinfo = {"userid":socket.userid,"SIMID":socket.simid};
		socket.leave(socket.simid);
		socket.broadcast.emit('leftroom',JSONdisconnectinfo);
	});

	  socket.on('logoutall',function(){
		  log.info("logout All users");
		socket.broadcast.emit('logout');
	  });
});

}
