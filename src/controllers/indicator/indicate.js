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
		log.info('SOC ==> userid:'+data.userid+'adduser :to a new simulator :'+data.simid +'request');
		var timeStamp = util.getCurrentTimestamp();
		var name;
		// store the username in the socket session for this client
		socket.userId = data.userid;
		// store the room name in the socket session for this client
		socket.simulators = data.simid;
		// add the client's username to the global list
		engine[name] = data.userid;
		// send client to socket.room
		socket.join(data.simid);
	});
	
	
	// Engine ON/OFF info to Cockpit from the Simulator
	socket.on('engine',function(data){
		log.info('SOC ==> simid:'+data.simid+'userid:'+data.userid+'EngineStatus');
		socket.broadcast.to(data.simid).emit('engine', data);
	});
	
	//Accessories status to be sent to Cockpit
	socket.on('accessories',function(data){
		log.info('SOC ==> simid:'+data.simid+'userid:'+data.userid+'accessories');
		socket.broadcast.to(data.simid).emit('accessories', data);
	});

	// Lamp status to be sent to Cockpit
	socket.on('lamp',function(data){
		log.info('SOC ==> simid:'+data.simid+'userid:'+data.userid+'lamp');
		socket.broadcast.to(data.simid).emit('lamp', data);
	});

	//Running status to be sent to Cockpit
	socket.on('speed',function(data){
		log.info('SOC ==> simid:'+data.simid+'userid:'+data.userid+'speed');
		socket.broadcast.to(data.simid).emit('speed', data);
	});

	//Wifi ON/OFF status to be sent to Simulator
	socket.on('wifi',function(data){
		log.info('SOC ==> simid:'+data.simid+'userid:'+data.userid+'wifi ON/OFF');
		socket.broadcast.to(data.simid).emit('wifi', data);
	});

	//BL ON/OFF status to be sent to Simulator
	socket.on('bt',function(data){
		log.info('SOC ==> simid:'+data.simid+'userid:'+data.userid+'Bluetooth ON/OFF');
		socket.broadcast.to(data.simid).emit('bt', data);
	});

	//Media ON/OFF status to be sent to Simulator
	socket.on('media',function(data){
		log.info('SOC ==> simid:'+data.simid+'userid:'+data.userid+'media ON/OFF');
		socket.broadcast.to(data.simid).emit('media', data);
	});

	//AirCondition ON/OFF status to be sent to Simulator
	socket.on('ac',function(data){
		log.info('SOC ==> simid:'+data.simid+'userid:'+data.userid+'AirCondition ON/OFF');
		socket.broadcast.to(data.simid).emit('ac', data);
	});

	//currentstatus of simulator --> to sent to Simulator (Asking for status)
	socket.on('currentstatus',function(data){
		log.info('SOC ==> simid:'+data.simid+'userid:'+data.userid+'currentstatus');
		socket.broadcast.to(data.simid).emit('currentstatus', data);
	});

	//currentstatus of simulator --> to sent to Cockpit (Providing status to Cockpit)
	socket.on('simstatus',function(data){
		log.info('SOC ==> simid:'+data.simid+'userid:'+data.userid+'simstatus');
		log.info("SIM status :"+JSON.stringify(data));
		socket.broadcast.to(data.simid).emit('simstatus', data);
	});

	//simulator --> to sent to Cockpit
	socket.on('hb',function(data){
		log.info('SOC ==> simid:'+data.simid+'userid:'+data.userid+'HandBrake status');
		socket.broadcast.to(data.simid).emit('hb', data);
	});

	//simulator --> to sent to Cockpit
	socket.on('indicator',function(data){
		log.info('SOC ==> simid:'+data.simid+'userid:'+data.userid+'indicator status');
		socket.broadcast.to(data.simid).emit('indicator', data);
	});


// 	socket.on('useradded',function(data){
// 		var time = util.getCurrentTimestamp();
// 		log.info('RoomID:'+data.roomid+'userId:'+data.userid+'useradded');
// 		var JSONobj = new Object();
// 		//send userremoved to update the clients
// 		JSONobj = {"userid":data.userid, "roomid":data.roomid};
// 		socket.broadcast.to(data.roomid).emit('useradded', JSONobj);
// 	});

// 	socket.on('newroomadded',function(data){
// 		log.info("new room added called");
// 		var time = util.getCurrentTimestamp();
// 		// log.info('RoomID:'+data.roomid+'newroomadded');
// /*		var JSONobj = new Object();
// 		//send userremoved to update the clients
// 		JSONobj = {"userid":data.userid, "roomid":data.roomid};*/
// 		socket.broadcast.emit('newroomadded', data);
// 	});

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
