app.controller('beerController', function($scope, beerFactory, $stateParams, $rootScope) {

  if (!$stateParams.beerParam) {
    beerFactory.getBeer($stateParams.id)
      .then(function(beer) {
        $scope.beer = beer;
      })
  } else {
    $scope.beer = $stateParams.beerParam;
  }

  $scope.addReview = function() {
    beerFactory.addReview($stateParams.id, $scope.newReview)
      .then(function(beer) {
        $scope.beer = beer;
      })
  }

  $scope.deleteReview = function() {
    beerFactory.deleteReview($stateParams.id, this.review._id)
      .then(function(beer) {
        $scope.beer = beer;
      })
  }


});
