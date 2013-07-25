Meteor.startup(function(){
})



 Meteor.autorun(function() {
   // Whenever this session variable changes, run this function.
   var message = Session.get('displayMessage');
   if (message) {
     var stringArray = message.split('&amp;');
     alert(stringArray[0], stringArray[1]);

     Session.set('displayMessage', null);
   }
 });
