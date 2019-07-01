CONTROLLERS.controller('StockCustomerCtrl', function($scope, $state, $http) {
  $scope.$on('$ionicView.enter', function(e) {
    console.log('Enter StockCustomerCtrl');
  });

  $scope.$on('$ionicView.leave', function(e) {
    console.log('Leave StockCustomerCtrl');
  });

  $scope.title = '訊息';

  // ==================================================
  $scope.getStockInfo = function(item, idx) {
    if (!item.show) {
      item.show = true
      $http.get(SERVER_CONFIG.PROTOCOL + SERVER_CONFIG.NEWSERVICE + 'Stocks/stockCustomerInfo', {
          params: {
            customerId: item.id
          },
          paramSerializer: '$httpParamSerializerJQLike'
        })
        .then(function(result) {
          $scope.list[idx]['customersInfo'] = result.data
        })
    } else {
      item.show = false
    }
  }

  $scope.searchCustomer = function(name) {
    $http.get(SERVER_CONFIG.PROTOCOL + SERVER_CONFIG.NEWSERVICE + 'CustomerMaster', {
        params: {
          fullName: {
            $like: '%' + name + '%'
          }
        },
        paramSerializer: '$httpParamSerializerJQLike'
      })
      .then(function(result) {
        $scope.list = result.data
      })
    console.log("name", name)
  }
});
