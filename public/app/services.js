//Services provide a way to organize related code and data that can be shared by 
//controllers and even other services. Unlike controllers, which are instantiated 
//and destroyed as the views they are attached to come into and out of view, services 
//are created once (singletons) and persist for the life of the application.

//Services should be used to hold the bulk of your application's logic and data, 
//thus keeping controllers focused on what they are responsible for.

angular.module('RecipeServices', ['ngResource'])
.factory('Recipe', ['$resource', function($resource) {
  return $resource('/api/recipes/:id');
}])
.factory("Auth", ["$window", function($window){
	return {
		saveToken: function(token) {
			//passing in as new token and saving 
			$window.localStorage["secretrecipes-token"] = token; 
		},
		getToken: function(){
			return $window.localStorage["secretrecipes-token"];
		},
		removeToken: function(){
			//Access local storage
			$window.localStorage.removeItem("secretrecipes-token"); 
		},
		isLoggedIn: function(){
			var token = this.getToken(); 
			//Ternary Operator
			return token ? true : false; 
		},
		getCurrentUser: function(){
			if(this.isLoggedIn()){
				var token = this.getToken();

				try {
					//Vulnerable code
					//https://www.w3schools.com/jsref/met_win_atob.asp 
					var payload = JSON.parse($window.atob(token.split(".")[1]));
					console.log("payload decoded:", payload);
					return payload; 
				}
				catch (err){
					//Graceful error handling 
					console.log(err);
					return false; 
				}
			}
			return false; 
		}
	}

}])
.factory("AuthInterceptor", ["Auth", function(Auth){
	return {
		request: function(config){
			var token = Auth.getToken(); 
			if(token){
				config.headers.Authorization = "Bearer " + token; 
			}
			return config; 
		}
	}
}])
.factory("Alerts", [function(){
	var alerts = [];

	return {
		clear: function(){
			alerts = [];
		},
		add: function(type, msg){
			alerts.push({type: type, msg: msg});
		},
		get: function(){
			return alerts; 
		},
		remove: function(index){
			alerts.splice(index, 1);
		}
	
	}
}]);