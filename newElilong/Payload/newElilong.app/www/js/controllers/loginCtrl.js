CONTROLLERS.controller('loginCtrl', function($scope, $ionicSideMenuDelegate, $state) {
  $scope.$on('$ionicView.enter', function(e) {
    console.log('Enter loginCtrl');
    $scope.loginData.account = '';
    $scope.loginData.password = '';
  });

  $scope.$on('$ionicView.leave', function(e) {
    console.log('Leave loginCtrl');
  });

  $scope.title = '易利隆鋼鐵';
  $scope.loginData = {};
  $scope.loginData.account = '';
  $scope.loginData.password = '';

  $scope.loginClick = function() {
    var loginInfo = {
      username: $scope.loginData.account,
      password: $scope.loginData.password
    };
    $state.go('tabs.homemenu.home');

    // return deviceService.getLoginInfo()
    //   .then(function(result) {
    //     loginInfo.deviceInfo = result;
    //     console.log(loginInfo);
    //     return authService.deviceLogin(loginInfo)
    //   })
    //   .then(function() {
    //     $state.go('tabBar.sideBar.roomOverview');
    //   })
    //   .catch(function(error) {
    //     console.error('[ERROR]loginClick():', error);
    //     ionicToast.show('登入失敗', 'top', false, 2500);
    //   });
    // $state.go('tabBar.sideBar.roomOverview');
  };
});
