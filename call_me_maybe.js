if (Meteor.is_client) {
  Meteor.startup(function() {
    // $.support.cors = true;
    getDealsFromYipit();
  });

  Template.hello.greeting = function () {
    return "Welcome to call_me_maybe.";
  };

  Template.hello.events = {
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  };
}

if (Meteor.is_server) {
  Meteor.startup(function () {
  });
}

function getDealsFromYipit() {
  var yipitURL = "http://api.yipit.com/v1/deals/?tag=restaurants,bar-club&division=new-york&limit=300&key=WfNYJS42NRP8V6nQ";
  // var headers = new Array();
  // var allowedHosts = new Array("http://localhost:3000");
  // headers["Access-Control-Allow-Origin"] = "http://localhost:3000";

  $.ajax({
    type: "get",
    url: yipitURL,
    dataType: "json",
    beforeSend: setHeader,
    headers: {"Access-Control-Allow-Origin":"http://localhost:3000",
              "Access-Control-Allow-Headers":"X-Requested-With"},
    success: function(response) {
      console.log(response);
    }
  });
}

function setHeader(xhr) {
     xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
 }