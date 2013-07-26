Meteor.autorun(function(){
	handle = Meteor.subscribeWithPagination("boxes", Session.get('currentRoomId'), 8);
});

var handle;

Template.boxes.boxes = function(){
  //             WHERE CLAUSE    PARAMETERS
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