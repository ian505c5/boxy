////////// Helpers for in-place editing //////////

// Returns an event_map key for attaching "ok/cancel" events to
// a text input (given by selector)
var okcancel_events = function (selector) {
  return 'submit '+selector;
};

// Creates an event handler for interpreting "escape", "return", and "blur"
// on a text field and calling "ok" or "cancel" callbacks.
var make_okcancel_handler = function (options) {
  var ok = options.ok || function () {};
  var cancel = options.cancel || function () {};

  return function (evt) {
     if (evt.type === "submit") {
      // blur/return/enter = ok/submit if non-empty
        evt.preventDefault();
        ok.call(this, evt);
      } else {
        cancel.call(this, evt);
    }
  };
};

Template.entry.events = {
  'change #box-type': function(event){
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
  }
};

Template.entry.events[okcancel_events('#submitBox')] = make_okcancel_handler({
  ok: function (text, event) {

    var type = document.getElementById('box-type');

    if (type.value == "image"){
      var url = $('#imageurl').val();

    } else if (type.value == "video") {
      var fullUrl = $('#videourl').val();

      var regex = /http:\/\/(www.)?youtube\.com\/watch\?v=([A-Za-z0-9._%-]*)(\&\S+)?/  
      var html = fullUrl.replace(regex, '$2');
      var url = html;

    } else if (type.value == "link") {
      var url = $('#linkurl').val();
    }

    var roomId = Session.get('currentRoomId');
    var user = Meteor.user().username;
    //VALIDATION LOL
    if(url != ""){
      var ts = Date.now() / 1000;

      //ADD ABOVE DATA TO COLLECTION, TEXT IS PASSED IN
      Boxes.insert({ user: user, time: ts, imageurl: url, linkurl: url, videourl: url, type: type.value, roomId: roomId });

      //CLEAR THE INPUTS
      url = "";
    } 
  }
});