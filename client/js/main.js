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

function changeMediaTypes(){
  $('#box-type').change(function(){
     if ($('#box-type').val() == "image") {
       $('#imageurl').show();
       $('#submitBox').find('.input-type:not(#imageurl)').hide();
     } else if ($('#box-type').val() == "video") {
       $('#videourl').show();
       $('#submitBox').find('.input-type:not(#videourl)').hide();
     } else if ($('#box-type').val() == "link") {
       $('#linkurl').show();
       $('#submitBox').find('.input-type:not(#linkurl)').hide();
     }
  });
}