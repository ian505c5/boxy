if(Meteor.isServer) {
    Meteor.publish("boxes", function(curRoom) {
    	if (curRoom==null){
    		return Boxes.find({}, { sort: {time: -1} });
    	} else {
    		return Boxes.find({ roomId: curRoom }, { sort: {time: -1} });
    	}    
    });
}