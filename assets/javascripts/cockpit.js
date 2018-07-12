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

function getRequest(url,callback, errorCallback){
  $.ajax({
      type: "GET",
      beforeSend: function(request) {
          request.setRequestHeader("Content-Type", 'application/json');
      },
      url: url,
      data: "",
      success: function(data) {
          // console.log(JSON.stringify(data));
          callback(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.log('jqXHR:'+JSON.stringify(jqXHR));
          console.log('textStatus:'+textStatus);
          console.log('errorThrown:'+errorThrown);
      }
  });
}

var socket = io.connect(config.socketURl);

var jsondata = new Object();
jsondata = {"simid":config.simid,"userid":config.cockpitUserid };

socket.on('connect', function(){
  console.log("socket client connected");
  $(".otherControlsDashboard").hide();
  socket.emit('adduser', jsondata);
  getCurrentStateOfSimulator();
});
function getCurrentStateOfSimulator(){

  var url = config.serverURL + config.currentstatus + "?simid=" + config.simid +"&userid=" + config.cockpitUserid;
  getRequest(url, function(response) {
    if(response.data) {

    } else if(response.error) {
      alert("Please on the simulator ");
    }
  });
};

socket.on('engine', function (data) {
    console.log("Listening engine "+JSON.stringify(data));
    $("#engineState").prop('checked',data.status);
  if(data.status){
    $(".otherControlsDashboard").show();
  }else{
    $(".otherControlsDashboard").hide();
  }
});

socket.on('lamp', function (data) {
  console.log("Listening speed "+JSON.stringify(data));
  $("#lampState").prop('checked',data.status);
});

socket.on('speed', function (data) {
  console.log("Listening speed "+JSON.stringify(data));
  $("#listenSliderForDashboard").val(data.range);
  $('.output b').text(data.range);
});

socket.on('accessories', function (data) {
  console.log("Listening accessories "+JSON.stringify(data));
  $("#dashboardWifi").prop('checked',data.accessories.wifi);
  $("#dashboardBt").prop('checked',data.accessories.bt);
  $("#dashboardMedia").prop('checked',data.accessories.media);
});

socket.on('simstatus', function (data) {
  console.log("Listening simstatus "+JSON.stringify(data));
  if(data.details.engine){
    $(".otherControlsDashboard").show();
    $("#engineState").prop('checked',data.details.engine);
    $("#lampState").prop('checked',data.details.lamp);
    $("#listenSliderForDashboard").val(data.details.speed);
    $('.output b').text(data.details.speed);
    $("#dashboardWifi").prop('checked',data.details.accessories.wifi);
    $("#dashboardBt").prop('checked',data.details.accessories.bt);
    $("#dashboardMedia").prop('checked',data.details.accessories.media);
  }else{
    $(".otherControlsDashboard").hide();
  }
});

socket.on('hb', function (data) {
  console.log("Listening hb "+JSON.stringify(data));
  $("#dashboardHandBrake").prop('checked',data.status);
});

socket.on('indicator', function (data) {
  console.log("Listening indicator "+JSON.stringify(data));
  $("#dashboardLIndicator").prop('checked',data.details.left);
  $("#dashboardRIndicator").prop('checked',data.details.right);
});

$("#dashboardWifi").change(function() {
 console.log("wifi change called");
  var wifiState = $("#dashboardWifi").is(":checked");
  console.log(wifiState);
  var postData = {
    "simid": config.simid,
    "userid": config.cockpitUserid,
    "status" : wifiState
  }
  var url = config.serverURL + config.wifi;
  postRequest(url, postData, function(response){
  		console.log(response);
  });
});
$("#dashboardMedia").change(function() {
 console.log("Media change called");
  var mediaState = $("#dashboardMedia").is(":checked");
  console.log(mediaState);
  var postData = {
    "simid": config.simid,
    "userid": config.cockpitUserid,
    "status" : mediaState
  }
  var url = config.serverURL + config.media;
  postRequest(url, postData, function(response){
  		console.log(response);
  });
});
$("#dashboardBt").change(function() {
 console.log("Bluetooth change called");
  var btState = $("#dashboardBt").is(":checked");
  console.log(btState);
  var postData = {
    "simid": config.simid,
    "userid": config.cockpitUserid,
    "status" : btState
  }
  var url = config.serverURL + config.blueTooth;
  postRequest(url, postData, function(response){
  		console.log(response);
  });
});
