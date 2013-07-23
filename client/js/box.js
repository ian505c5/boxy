Template.boxes.boxes = function(){
  //             WHERE CLAUSE    PARAMETERS
  var curRoom = Session.get('currentRoomId');
  if (curRoom){
  	return Boxes.find({ roomId: curRoom }, { sort: {time: -1} });
  } else {
  	return Boxes.find({}, { sort: {time: -1} });
  }
  
};


Template.boxes.typeIs = function(type){
  return this.type == type;
}

Template.boxes.signedIn = function(){
  return Meteor.user();
}
