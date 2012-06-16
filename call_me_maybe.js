Users = new Meteor.Collection("users");
Deals = new Meteor.Collection("deals");

if (Meteor.is_client) {
  Meteor.startup(function() {
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
    getDealsFromYipit();
  });
}

function getDealsFromYipit() {
    var yipitURL = "http://api.yipit.com/v1/deals/?tag=restaurants,bar-club&division=new-york&limit=5&key=WfNYJS42NRP8V6nQ";

    Meteor.http.get(yipitURL, {}, function(error, result){
    var deals = result.data.response.deals;
    console.log("found " + deals.length + " deals!");

    console.log("sample deal: ");
    console.log(deals[0]);

    for(var i = 0; i < deals.length; i++) {
    }
  });
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

function showLoginForm() {
  $('#login').show();
  $('#sign-up').hide();
  $('#see-other-form').html('<h6><a href="#" onclick="showSignupForm(); return false;">(New user?)</a></h6>');
}

function showSignupForm() {
  $('#login').hide();
  $('#sign-up').show();
  $('#see-other-form').html('<h6><a href="#" onclick="showLoginForm(); return false;">(Already signed up?)</a></h6>');
}
