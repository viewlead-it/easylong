CONTROLLERS.controller('MessageCtrl', function($scope) {
  $scope.$on('$ionicView.enter', function(e) {
    console.log('Enter messageCtrl');

    setSampleData();
  });

  $scope.$on('$ionicView.leave', function(e) {
    console.log('Leave messageCtrl');
  });

  $scope.title = '訊息';
  $scope.list = [];

  // ==================================================

  var sampleList = [{
      name: 'Sam',
      topic: '我是主旨',
      message: '我是訊息我是訊息我是訊息我是訊息我是訊息我是訊息我是訊息我是訊息我是訊息'
    },
    {
      name: 'Scott',
      topic: '我也是主旨',
      message: '我也是訊息我也是訊息我也是訊息我也是訊息我也是訊息我也是訊息我也是訊息我也是訊息我也是訊息'
    },
    {
      name: 'Moroi',
      topic: '我還是主旨',
      message: '我還是主旨我還是主旨我還是主旨我還是主旨我還是主旨'
    }
  ];

  var setSampleData = function() {
    $scope.list = sampleList;
  };
});
