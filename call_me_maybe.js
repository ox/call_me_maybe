Users = new Meteor.Collection("users");
Deals = new Meteor.Collection("deals");

if (Meteor.is_client) {
  Meteor.startup(function() {
    // $.support.cors = true;
    getDealsFromYipit();
  });

  Template.login_form.events = {
    'click .submit': function() {
      var username = document.getElementsByName('username')[0].value;
      var password = document.getElementsByName('password')[0].value;
      console.log("trying " + username + ", " + password);
    
    }
  }
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    add_test_users();
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

var add_test_users = function() {
  if(Users.find().count() === 0) {
      for(var i = 0; i < 15; i++) {
        Users.insert({username: "test_user_"+i,
                      password: 'foo',
                      first_name: 'Test',
                      last_name: 'User'+i,
                      age: Math.floor(Math.random()*10)*5});
      }
    }
}
