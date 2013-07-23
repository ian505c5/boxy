Template.rooms.rooms = function(){
  //             WHERE CLAUSE    PARAMETERS
  return Rooms.find({}, { sort: {time: -1} });
};

Template.room.boxes = function(){
  //             WHERE CLAUSE    PARAMETERS
  var curRoom = Session.get('currentRoomId');
  return Boxes.find({ roomId: curRoom }, { sort: {time: -1} });
};
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

Template.create_room.events = {};

Template.create_room.events[okcancel_events('#createRoom')] = make_okcancel_handler({
  ok: function (text, event) {

    var roomName = document.getElementById('roomName');
    var roomDesc = document.getElementById('roomDesc');
    var user = Meteor.user().username;
    //VALIDATION LOL
    if(roomName.value != ""){
      var ts = Date.now() / 1000;

      //ADD ABOVE DATA TO COLLECTION, TEXT IS PASSED IN
      Rooms.insert({ creator: user, name: roomName.value, description: roomDesc.value, time: ts });

      //CLEAR THE INPUTS
      roomName.value = "";
      roomDesc.value = "";
    } 
  }
});