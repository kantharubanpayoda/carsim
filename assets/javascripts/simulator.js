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
$("#engineControl").change(function() {
 console.log("Engine control change called");
  var engineState = $(this).is(":checked");
  console.log(engineState);
  var postData = {
    "simid": config.simualtorUserid,
    "userid": config.cockpitUserid,
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
    "simid": config.simualtorUserid,
    "userid": config.cockpitUserid,
    "status" : lampState
  }
  var url = config.serverURL + config.lampstatus;
  postRequest(url, postData, function(response){
  		console.log(response);
  });
});

$('#listenSlider').change(function() {
  $('.output b').text(this.value);
  var speedRange = this.value;
  console.log(speedRange);
  var postData = {
    "simid": config.simualtorUserid,
    "userid": config.cockpitUserid,
    "range" : speedRange
  };
  var url = config.serverURL + config.runningstatus;
  postRequest(url, postData, function(response){
      console.log(response);
  });
});
