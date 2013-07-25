var handle = Meteor.subscribeWithPagination("boxes", Session.get('currentRoomId'), 8);

Template.boxes.boxes = function(){
  //             WHERE CLAUSE    PARAMETERS
  var curRoom = Session.get('currentRoomId');
  return Boxes.find({}, { sort: {time: -1} });
  
};

Template.boxes.typeIs = function(type){
  return this.type == type;
}

Template.boxes.signedIn = function(){
  return Meteor.user();
}

Template.boxes.events = {
  'click .more-link': function(event){
  	event.preventDefault();
  	handle.loadNextPage();
  }
};