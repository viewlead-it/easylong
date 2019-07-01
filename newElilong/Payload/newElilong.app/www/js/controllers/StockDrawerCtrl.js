CONTROLLERS.controller('StockDrawerCtrl', function($scope, $state, $http) {
  $scope.$on('$ionicView.enter', function(e) {
    console.log('Enter StockDrawerCtrl');

    initPage();
  });

  $scope.$on('$ionicView.leave', function(e) {
    console.log('Leave StockDrawerCtrl');
  });

  $scope.title = '訊息';
  // ==================================================

  var initPage = function() {
    $http.get(SERVER_CONFIG.PROTOCOL + SERVER_CONFIG.NEWSERVICE + 'DrawerMaster', {
        params: {},
        paramSerializer: '$httpParamSerializerJQLike'
      })
      .then(function(result) {
        $scope.list = result.data;
        console.log("$scope.list",$scope.list)
      })
  };

  $scope.getStockInfo = function(item, idx) {
    if (!item.show) {
      item.show = true
      $http.get(SERVER_CONFIG.PROTOCOL + SERVER_CONFIG.NEWSERVICE + 'Stocks/stockDrawerInfo', {
          params: {
            drawerMasterId: item.id
          },
          paramSerializer: '$httpParamSerializerJQLike'
        })
        .then(function(result) {
          $scope.list[idx]['stockDrawerInfo'] = result.data
          console.log("$scope.list[idx]",$scope.list[idx])
        })
    } else {
      item.show = false
    }
  }

});
