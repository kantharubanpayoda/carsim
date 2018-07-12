function postRequest(url,postData,callback, errorCallback){
    $.ajax({
        type: "POST",
        beforeSend: function(request) {
            request.setRequestHeader("Content-Type", 'application/json');
        },
        url: url,
        data: JSON.stringify(postData),
        success: function(data) {
            // console.log(JSON.stringify(data));
            callback(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('jqXHR:'+jqXHR);
            console.log('textStatus:'+textStatus);
            console.log('errorThrown:'+errorThrown);
        }
    });
}
var socket = io.connect(config.socketURl);

var jsondata = new Object();
jsondata = {"simid":config.simid,"userid":config.simualtorUserid };

socket.on('connect', function(){
  console.log("socket client connected");
  socket.emit('adduser', jsondata);
});

socket.on('wifi', function (data) {
  console.log("Listening wifi "+JSON.stringify(data));
  $("#wifi").prop('checked',data.status);
});

socket.on('media', function (data) {
  console.log("Listening media "+JSON.stringify(data));
  $("#media").prop('checked',data.status);
});

socket.on('bt', function (data) {
  console.log("Listening bt "+JSON.stringify(data));
  $("#bt").prop('checked',data.status);
});

socket.on('currentstatus', function (data) {

  var accessories = {
    "wifi":$("#wifi").is(":checked"),
    "bt":$("#bt").is(":checked"),
    "media":$("#media").is(":checked")
  };

  var details = {
    "engine":$("#engineControl").is(":checked"),
    "lamp":$("#lampControl").is(":checked"),
    "speed":$('.output b').text(),
    "accessories":accessories
  };

  var postData = {
    "simid": config.simid,
    "userid": config.simualtorUserid,
    "details" : details
  };
  console.log("current status of simulator");
  console.log(postData);

  var url = config.serverURL + config.simulatorstatus;
  postRequest(url, postData, function(response){
  		console.log(response);
  });

});

$("#engineControl").change(function() {
 console.log("Engine control change called");
  var engineState = $(this).is(":checked");
  console.log(engineState);
  var postData = {
    "simid": config.simid,
    "userid": config.simualtorUserid,
    "status" : engineState
  }
  var url = config.serverURL + config.enginestatus;
  postRequest(url, postData, function(response){
  		console.log(response);
  });

});

$("#lampControl").change(function() {
 console.log("lampControl change called");
  var lampState = $(this).is(":checked");
  console.log(lampState);
  var postData = {
    "simid": config.simid,
    "userid": config.simualtorUserid,
    "status" : lampState
  }
  var url = config.serverURL + config.lampstatus;
  postRequest(url, postData, function(response){
  		console.log(response);
  });
});

$("#wifi,#bt,#media").change(function() {
 console.log("wifi change called");
  var wifiState = $("#wifi").is(":checked");
  console.log(wifiState);
  var btState = $("#bt").is(":checked");
  console.log(btState);
  var mediaState = $("#media").is(":checked");
  console.log(mediaState);
  var accessories = {
    "wifi" : wifiState,
    "bt": btState,
    "media":mediaState
  };
  var postData = {
    "simid": config.simid,
    "userid": config.simualtorUserid,
    "accessories" : accessories
  }
  var url = config.serverURL + config.accessoriesstatus;
  postRequest(url, postData, function(response){
  		console.log(response);
  });
});

$('#listenSlider').change(function() {
  $('.output b').text(this.value);
  var speedRange = this.value;
  console.log(speedRange);
  var postData = {
    "simid": config.simid,
    "userid": config.simualtorUserid,
    "range" : speedRange
  };
  var url = config.serverURL + config.runningstatus;
  postRequest(url, postData, function(response){
      console.log(response);
  });
});

$("#handBrake").change(function() {
 console.log("handBrake change called");
  var handBrakeState = $(this).is(":checked");
  console.log(handBrakeState);
  var postData = {
    "simid": config.simid,
    "userid": config.simualtorUserid,
    "status" : handBrakeState
  }
  var url = config.serverURL + config.handBrake;
  postRequest(url, postData, function(response){
  		console.log(response);
  });
});

$("#lIndicator,#rIndicator").change(function() {
 console.log("Indicator change called");
  var lIndicatorState = $("#lIndicator").is(":checked");
  console.log(lIndicatorState);
  var rIndicatorState = $("#rIndicator").is(":checked");
  console.log(rIndicatorState);
  var details = {
    "left":lIndicatorState,
    "right":rIndicatorState
  };
  var postData = {
    "simid": config.simid,
    "userid": config.simualtorUserid,
    "details" : details
  }
  var url = config.serverURL + config.indicator;
  postRequest(url, postData, function(response){
  		console.log(response);
  });
});
