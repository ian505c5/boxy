Template.boxes.boxes = function(){
  //             WHERE CLAUSE    PARAMETERS
  var curRoom = Session.get('currentRoomId');

  Meteor.autorun(function() {
          Meteor.subscribe("boxes", Session.get('currentRoomId'));
      });
  return Boxes.find({}, { sort: {time: -1} });
};

Template.boxes.typeIs = function(type){
  return this.type == type;
}

Template.boxes.signedIn = function(){
  return Meteor.user();
}
