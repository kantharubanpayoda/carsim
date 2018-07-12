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
jsondata = {"simid":config.simualtorUserid,"userid":config.cockpitUserid };

socket.on('connect', function(){
  console.log("socket client connected");
  socket.emit('adduser', jsondata);
});

socket.on('engine', function (data) {
  console.log("Listening engine "+JSON.stringify(data));
  $("#engineState").prop('checked',data.status);
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
