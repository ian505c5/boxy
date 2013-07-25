if(Meteor.isServer) {
    Meteor.publish("boxes", function(curRoom, limit) {
    	if (curRoom==null){
    		return Boxes.find({}, { sort: {time: -1}, limit: limit });
    	} else {
    		return Boxes.find({ roomId: curRoom }, { sort: {time: -1}, limit: limit });
    	}    
    });
}