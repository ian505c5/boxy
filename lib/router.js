if (Meteor.isClient) {
	// ROUTES
	Meteor.Router.add({
	  '/': 'home',
	  '/login': 'login',
	  '/home': 'home',
	  '/register':'register',
	  '/loading': 'loading',
	  '/create': 'create_room',
	  '/rooms': 'rooms',
	  '/rooms/:_id': { to: 'room', and: function(id) {
	  	Session.set('currentRoomId', id);
	  }},
	  '/signout': function(){
	  	if (Meteor.user()) {
	  		Meteor.logout();
	  		return 'login'
	  	} else {
	  		return 'login'
	  	}
	  }
	});

	//FILTERS
	Meteor.Router.filter('checkLoggedIn', {except: ['register', 'signout', 'login']});


	Meteor.Router.filters({
		'checkLoggedIn': function(page) {
			if (Meteor.loggingIn()) {
			      return 'loading';
			    } else if (Meteor.user()) {
			      return page;
			    } else {
			      return 'login';
			    }
			}
	});

	//BEFORE

	Meteor.Router.beforeRouting = function() {
		Session.set('currentRoomId', null);
	}
}