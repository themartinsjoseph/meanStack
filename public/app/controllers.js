angular.module('RecipeCtrls', ['RecipeServices'])
.controller('HomeCtrl', ['$scope', 'Recipe', function($scope, Recipe) {
  $scope.recipes = [];

  Recipe.query(function success(data) {
    $scope.recipes = data;
  }, function error(data) {
    console.log(data);
  });

  $scope.deleteRecipe = function(id, recipesIdx) {
    Recipe.delete({ id: id }, function success(data) {
      $scope.recipes.splice(recipesIdx, 1);
    }, function error(data) {
      console.log(data);
    });
  };
}])
.controller('ShowCtrl', ['$scope', '$stateParams', 'Recipe', function($scope, $stateParams, Recipe) {
  $scope.recipe = {};

  Recipe.get({ id: $stateParams.id }, function success(data) {
    $scope.recipe = data;
  }, function error(data) {
    console.log(data);
  });
}])
.controller('NewCtrl', ['$scope', '$location', 'Recipe', function($scope, $location, Recipe) {
  $scope.recipe = {
    title: '',
    description: '',
    image: ''
  };

  $scope.createRecipe = function() {
    Recipe.save($scope.recipe, function success(data) {
      $location.path('/');
    }, function error(data) {
      console.log(data);
    });
  };
}])
.controller('NavCtrl', ['$scope', "Auth", function($scope, Auth) {
  $scope.isLoggedIn = function(){
    return Auth.isLoggedIn();
  };
  $scope.logout = function() {
    Auth.removeToken(); 
    Alerts.add("success", "You are no w logged out!");
    $state.go("home");
  };
}])

.controller('SignupCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  //call $location to help redirect 
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userSignup = function() {
    $http.post("/api/users", $scope.user).then(function success(res){

      console.log("succesful signup");
      //call $location to help redirect 
      //res is response
      console.log(res);
     $state.go("home");
    }, function error(res){
        console.log("error", res);
    });
  };
}])
.controller('LoginCtrl', ['$scope', '$http', '$state', 'Auth', "Alerts", function($scope, $http, $state, Auth, Alerts) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userLogin = function() {
    $http.post("/api/auth", $scope.user).then(function success(res){
      console.log("success", res);
      Auth.saveToken(res.data.token);
      Alerts.add("success", "You are now logged in as " + res.data.user.email);
     $state.go("home");
    }, function error(res){
      //res is response
      console.log("error", res);
      Alerts.add("error", "Bad login info")
    })
  };
}])
.controller("AlertsCtrl", ["$scope", "Alerts", function($scope, Alerts){
  $scope.alerts = Alerts.get(); 
}]);
