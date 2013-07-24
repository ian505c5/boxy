if(Meteor.isServer) {
    Meteor.publish("rooms", function() {
        return Rooms.find({}, { sort: {time: -1} });
    });
}