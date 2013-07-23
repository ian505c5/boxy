Template.login.events({
  'submit #login-form': function(e,t){
    e.preventDefault();
    //retrieve the input values
    var email = trimInput(t.find('#login-email').value),
      password = t.find('#login-password').value;

    //Trim and vlaidate your fields here

    //If validation passes, supply the appropriate
    // fields to the Meteor.loginWithPassword() funciton.
    Meteor.loginWithPassword(email,password,function(err){
      if(err){
        // The user might not have been found, or their passwword
       // could be incorrect. Inform the user that their
       // login attempt has failed. 

      } else {
        Meteor.Router.to('/home');
      }
    });

    return false;
  }

});

Template.login.signedIn = function(){
  return Meteor.user();
}

Template.login.username = function(){
  return Meteor.user().username;
}

var trimInput = function(val) {
    return val.replace(/^\s*|\s*$/g, "");
}
var isValidPassword = function(val) {
  if (val.length >= 6) {
      return true;
    } else {
      Session.set('displayMessage', 'Error &amp; Too short.')
      return false; 
    }
}
