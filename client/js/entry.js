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

Template.entry.events = {};

Template.entry.events[okcancel_events('#submitBox')] = make_okcancel_handler({
  ok: function (text, event) {

    var type = document.getElementById('box-type');
    if (type.value == "image"){
      var url = document.getElementById('imageurl');
    } else if (type.value == "video") {
      var url = document.getElementById('videourl');
    } else if (type.value == "link") {
      var url = document.getElementById('linkurl');
    }
    var roomId = Session.get('currentRoomId');
    console.log(roomId);

    var user = Meteor.user().username;
    //VALIDATION LOL
    if(url.value != ""){
      var ts = Date.now() / 1000;

      //ADD ABOVE DATA TO COLLECTION, TEXT IS PASSED IN
      Boxes.insert({ user: user, time: ts, imageurl: url.value, linkurl: url.value, videourl: url.value, type: type.value, roomId: roomId });

      //CLEAR THE INPUTS
      url.value = "";
    } 
  }
});