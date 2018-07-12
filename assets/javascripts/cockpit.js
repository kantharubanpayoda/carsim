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
    // $("#engineState").prop('checked',data.status);
    if(data.status){
      console.log("lamp on")
      $("#engineState").addClass('engine-active'); 
      $(".otherControlsDashboard").show();       
    }else{
      $(".otherControlsDashboard").hide();
      $("#engineState").removeClass( "engine-active" )
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
    
  }else{
    $('#dashboardWifi').text("wifi_off");     
  }
  // $("#dashboardBt").prop('checked',data.accessories.bt);
  if(!data.accessories.bt){
    console.log("bt on")
    $('#dashboardBt').removeClass("bt-active");
    
  }else{
    $('#dashboardBt').addClass("bt-active");     
  }
  $("#dashboardMedia").prop('checked',data.accessories.media);
});

socket.on('simstatus', function (data) {
  console.log("Listening simstatus "+JSON.stringify(data));
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
      
    }else{
      $('#dashboardWifi').text("wifi_off");     
    }
    // $("#dashboardBt").prop('checked',data.details.accessories.bt);
    if(!data.details.accessories.bt){
      console.log("wifi on")
      $('#dashboardBt').removeClass("bt-active");
      
    }else{
      $('#dashboardBt').addClass("bt-active");     
    }
    $("#dashboardMedia").prop('checked',data.details.accessories.media);
  }else{
    $(".otherControlsDashboard").hide();
    $("#engineState").removeClass( "engine-active" )    
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

$("#dashboardWifi").click(function() {
 console.log("wifi change called");
  if($('#dashboardWifi').text().trim()==="wifi_off"){
    console.log("wifi on")
    $('#dashboardWifi').text("wifi");
    
  }else{
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
$("#dashboardBt").click(function() {
 console.log("Bluetooth change called");
  if($('#dashboardBt').hasClass("bt-active")){
    console.log("wifi on")
    $('#dashboardBt').removeClass("bt-active");
    
  }else{
    $('#dashboardBt').addClass("bt-active");     
  }
  var btState = $('#dashboardBt').hasClass("bt-active");
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
