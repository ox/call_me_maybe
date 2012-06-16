Users = new Meteor.Collection("users");
Deals = new Meteor.Collection("deals");

if (Meteor.is_client) {
  Meteor.startup(function() {
    if (typeof console !== 'undefined') {

    }
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
    // code to run on server at startup
    add_test_users();
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