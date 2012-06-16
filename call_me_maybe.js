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

  Template.deals.deals = function() {
    return Deals.find({active: 1});
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
      cd = deals[i];
      deal = Deals.find({'business id': cd.business.id, 
                    'end_date': cd.end_date,
                    'active': cd.active}, {limit: 1}).fetch();
      if(deal !== []) {
        console.log("adding deal from " + cd.business.name);
        Deals.insert(cd);
      }
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
  $('#deals').hide();
  $('.signup').hide();
  $('#see-other-form').html('<h6><a href="#" onclick="showSignupForm(); return false;">(New user?)</a></h6>');
  $('header').html('<h1>We know who you are!</h1>')
}

function showSignupForm() {
  $('#login').hide();
  $('#deals').hide();
  $('.signup').show();
  $('#see-other-form').html('<h6><a href="#" onclick="showLoginForm(); return false;">(Already signed up?)</a></h6>');
  $('header').html('<h1>Tell us a little about yourself!</h1>');
}

function showDeals() {
  $('#login').hide();
  $('.signup').show();
  $('#see-other-form').hide();
}
