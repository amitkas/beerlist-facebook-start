var app = angular.module('beerList', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

  $locationProvider.html5Mode(true);
  $stateProvider
    .state('home', {
      url: '/home',
      controller: 'mainController',
      templateUrl: '/templates/home.html'
    })
    .state('beer', {
      url: '/beer/:id',
      controller: 'beerController',
      templateUrl: '/templates/beer.html',
      params: {
        beerParam: null
      }
    })

    .state('auth', {
      url: '/authorization?token&name',
      controller: function ($stateParams, $state, $rootScope, $http) {
        $rootScope.currentUser = $stateParams.name;
        if ($stateParams.token) {
          var user = {
            name: $stateParams.name,
            token: $stateParams.token
          }
          localStorage.setItem("user", JSON.stringify(user));
          $rootScope.currentUser = user.name;
          $http.defaults.headers.common.Authorization = 'Bearer ' + user.token;
          $state.go('home');
        }
      },

    })

  $httpProvider.interceptors.push(function ($q, $window) {
    return {
      responseError: function (error) {
        if (error.data.message == "jwt expired") {
          $window.location.href = "/auth/facebook"
          return error
        } else {
          return $q.reject(error)
        }
      }
    };
  })


  $urlRouterProvider.otherwise('/home');
});

app.run(function ($rootScope, $http) {
  //retrieve user from local storage
  //if a user was retrieved set the currentUser
  var user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    $rootScope.currentUser = user.name;
  }
  $http.defaults.headers.common.Authorization = 'Bearer ' + user.token;

})