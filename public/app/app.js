//Angular

//Calling the app var and dependencies
var app = angular.module('RecipeApp', ['ui.router', 'RecipeCtrls']);

//Referencing the views
//Each AngularJS module has a config method that allows us to provide code 
//that runs when a module is loaded. The config method is used most commonly 
//to setup routing, which allows your app to have multiple views.
app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/404');

    $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'app/views/recipes.html',
    controller: 'HomeCtrl'
  })
  .state('newRecipe', {
    url: '/recipes/new',
    templateUrl: 'app/views/newRecipe.html',
    controller: 'NewCtrl'
  })
  .state('recipeShow', {
    url: '/recipes/:id',
    templateUrl: 'app/views/showRecipe.html',
    controller: 'ShowCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'app/views/userSignup.html',
    controller: 'SignupCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'app/views/userLogin.html',
    controller: 'LoginCtrl'
  })
  .state('404', {
    url: '/404',
    templateUrl: 'app/views/404.html'
  });

  $locationProvider.html5Mode(true);
}])
.config(["$httpProvider", function($httpProvider){
  $httpProvider.interceptors.push("AuthInterceptor");
}]);