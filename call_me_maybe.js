Users = new Meteor.Collection("users");
Deals = new Meteor.Collection("deals");


if (Meteor.is_client) {
  Meteor.startup(function() {
    if (typeof console !== 'undefined') {

    }
  });
	
	//Login validation area
	Template.user_plate.is_validated = function () {
		return Session.get('uid') !== undefined;
	} 

	Template.user_greeting.username = function () {
		return Session.get('user').username || "";
	} 

	Template.user_greeting.events = {
		'click #logout': function () {
				Session.set('uid', undefined);
				Session.set('user',undefined);
		}

	};

  Template.login_form.events = {
    'click .submit': function() {
      var username = document.getElementsByName('username')[0].value;
      var password = document.getElementsByName('password')[0].value;
      //console.log("trying " + username + ", " + password);
	  var user = Users.findOne( {"username": username, "password": password});
      if(user !== undefined) {
			Session.set('uid',user._id);
			Session.set('user', user);
			//console.log("uid set:" + Session.get('uid'));
	  }
    }
  }

  //End login


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
