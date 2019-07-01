CONTROLLERS.controller('StockStorageCtrl', function($scope, $state, $http) {
  $scope.$on('$ionicView.enter', function(e) {
    console.log('Enter StockStorageCtrl');

    initPage();
  });

  $scope.$on('$ionicView.leave', function(e) {
    console.log('Leave StockStorageCtrl');
  });

  $scope.title = '訊息';
  // ==================================================

  var initPage = function() {
    $http.get(SERVER_CONFIG.PROTOCOL + SERVER_CONFIG.NEWSERVICE + 'StorageMaster', {
        params: {},
        paramSerializer: '$httpParamSerializerJQLike'
      })
      .then(function(result) {
        $scope.list = result.data;
      })
  };

  $scope.getStockInfo = function(item, idx) {
    if (!item.show) {
      item.show = true
      $http.get(SERVER_CONFIG.PROTOCOL + SERVER_CONFIG.NEWSERVICE + 'Stocks/stockStorageInfo', {
          params: {
            storageMasterId: item.id
          },
          paramSerializer: '$httpParamSerializerJQLike'
        })
        .then(function(result) {
          $scope.list[idx]['storagesInfo'] = result.data
        })
    } else {
      item.show = false
    }
  }
});
