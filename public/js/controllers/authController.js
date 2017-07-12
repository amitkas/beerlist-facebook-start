app.controller('AuthCtrl', function ($scope, $rootScope, $http) {
  $scope.logout = function () {
    localStorage.clear("user");
    $rootScope.currentUser = null;
    delete $http.defaults.headers.common.Authorization;

  }
});