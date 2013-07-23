Template.register.events({
  'submit #register-form' : function(e, t) {
    e.preventDefault();
    var email = trimInput(t.find('#account-email').value)
      , password = t.find('#account-password').value
      , username = t.find('#account-username').value;

    if(isValidPassword(password)){
      Accounts.createUser({email: email, password : password, username: username}, function(err){
        if (err) {
          alrt('Failed to create account');
        } else {
          Meteor.Router.to('/home');
        }

      });
    }    
    return false;
  }
});

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