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
//reset controls on engine off and then on
function resetControls(){
  $('.output b').text(0);
}
socket.on('engine', function (data) {
    console.log("Listening engine "+JSON.stringify(data));
    // $("#engineState").prop('checked',data.status);
    if(data.status){
      console.log("lamp on")
      $("#engineState").addClass('engine-active');
      $(".otherControlsDashboard").show();
    }else{
      resetControls();
      $("#engineState").removeClass( "engine-active" )
      $(".otherControlsDashboard").hide();
    }
});

socket.on('lamp', function (data) {
  console.log("Listening speed "+JSON.stringify(data));
  if(data.status){
    console.log("lamp on")
    $("#lampState").addClass('lamp-active');
  }else{
    $("#lampState").removeClass( "lamp-active" )
  }
});

socket.on('speed', function (data) {
  console.log("Listening speed "+JSON.stringify(data));
  $("#listenSliderForDashboard").val(data.range);
  $('.output b').text(data.range);
});

socket.on('accessories', function (data) {
  console.log("Listening accessories "+JSON.stringify(data));
  // $("#dashboardWifi").prop('checked',data.accessories.wifi);
  //wifi status update
  if(data.accessories.wifi){
    console.log("wifi on")
    $('#dashboardWifi').text("wifi");
    $('#dashboardWifi').addClass("acc-active");
  }else{
    $('#dashboardWifi').text("wifi_off");
    $('#dashboardWifi').removeClass("acc-active");
  }
  // $("#dashboardBt").prop('checked',data.accessories.bt);
  if(!data.accessories.bt){
    console.log("bt on")
    $('#dashboardBt').removeClass("acc-active");

  }else{
    $('#dashboardBt').addClass("acc-active");
  }
  // $("#dashboardMedia").prop('checked',data.accessories.media);
  if(!data.accessories.media){
    console.log("wifi on")
    $('#dashboardMedia').removeClass("acc-active");

  }else{
    $('#dashboardMedia').addClass("acc-active");
  }
});

socket.on('simstatus', function (data) {
  console.log("Listening simstatus "+JSON.stringify(data));
    if(data.details.handbrake){
      console.log("handbrake on")
      $("#dashboardHandBrake").addClass('brake-active');
    }else{
      $("#dashboardHandBrake").removeClass( "brake-active" )
    }

  if(data.details.engine){
    $(".otherControlsDashboard").show();
    $("#engineState").addClass('engine-active');
    // $("#engineState").prop('checked',data.details.engine);
    // $("#lampState").prop('checked',data.details.lamp);
    if(data.details.lamp){
      console.log("lamp on")
      $("#lampState").addClass('lamp-active');
    }else{
      $("#lampState").removeClass( "lamp-active" )
    }
    $("#listenSliderForDashboard").val(data.details.speed);
    $('.output b').text(data.details.speed);
    // $("#dashboardWifi").prop('checked',data.details.accessories.wifi);
    if(data.details.accessories.wifi){
      console.log("wifi on")
      $('#dashboardWifi').text("wifi");
      $('#dashboardWifi').addClass("acc-active");

    }else{
      $('#dashboardWifi').text("wifi_off");
      $('#dashboardWifi').removeClass("acc-active");
    }
    // $("#dashboardBt").prop('checked',data.details.accessories.bt);
    if(!data.details.accessories.bt){
      console.log("wifi on")
      $('#dashboardBt').removeClass("acc-active");

    }else{
      $('#dashboardBt').addClass("acc-active");
    }
    // $("#dashboardMedia").prop('checked',data.details.accessories.media);
    if(!data.details.accessories.media){
      console.log("wifi on")
      $('#dashboardMedia').removeClass("acc-active");

    }else{
      $('#dashboardMedia').addClass("acc-active");
    }
  }else{
    resetControls();
    $(".otherControlsDashboard").hide();
    $("#engineState").removeClass( "engine-active" )
  }
});

socket.on('hb', function (data) {
  console.log("Listening hb "+JSON.stringify(data));
  if(data.status){
    console.log("lamp on")
    $("#dashboardHandBrake").addClass('brake-active');
  }else{
    $("#dashboardHandBrake").removeClass( "brake-active" )
  }
  // $("#dashboardHandBrake").prop('checked',data.status);
});

socket.on('indicator', function (data) {
  console.log("Listening indicator "+JSON.stringify(data));
  // $("#dashboardLIndicator").prop('checked',data.details.left);
  if(data.details.left){
    console.log("lamp on")
    $("#dashboardRIndicator").removeClass('indicator-active');
    $("#dashboardLIndicator").addClass('indicator-active');
  }else if(data.details.right){
    $("#dashboardLIndicator").removeClass('indicator-active');
    $("#dashboardRIndicator").addClass( "indicator-active" )
  }else{
    $("#dashboardLIndicator").removeClass('indicator-active');
    $("#dashboardRIndicator").removeClass('indicator-active');
  }
  // $("#dashboardRIndicator").prop('checked',data.details.right);
});

$("#dashboardWifi").click(function() {
 console.log("wifi change called");
  if($('#dashboardWifi').text().trim()==="wifi_off"){
    console.log("wifi on")
    $('#dashboardWifi').text("wifi");
    $('#dashboardWifi').addClass("acc-active");

  }else{
    $('#dashboardWifi').removeClass("acc-active");
    $('#dashboardWifi').text("wifi_off");
  }
  var wifiState = $('#dashboardWifi').text().trim()==="wifi_off" ? false : true;
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
$("#dashboardMedia").click(function() {
 console.log("Media change called");
 if($('#dashboardMedia').hasClass("acc-active")){
    console.log("wifi on")
    $('#dashboardMedia').removeClass("acc-active");

  }else{
    $('#dashboardMedia').addClass("acc-active");
  }
  var mediaState = $("#dashboardMedia").hasClass("acc-active");
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
$("#dashboardBt").click(function() {
 console.log("Bluetooth change called");
  if($('#dashboardBt').hasClass("acc-active")){
    console.log("wifi on")
    $('#dashboardBt').removeClass("acc-active");

  }else{
    $('#dashboardBt').addClass("acc-active");
  }
  var btState = $('#dashboardBt').hasClass("acc-active");
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
