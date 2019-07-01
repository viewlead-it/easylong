CONTROLLERS.controller('SearchOrderCtrl', function($scope, $state, $filter, $http, ionicDatePicker) {

  // $scope.records = [
  //   {
  //     "cusName":"易利晟鋼鐵有限公司",
  //     "caseName":"公司用-海光",
  //     "addr":"台南市-歸仁區",
  //     "weight":"1001"
  //   },
  //   {
  //     "cusName":"易利晟鋼鐵有限公司",
  //     "caseName":"公司用-海光",
  //     "addr":"台南市-歸仁區",
  //     "weight":"1002"
  //   },
  //   {
  //     "cusName":"易利晟鋼鐵有限公司",
  //     "caseName":"公司用-海光",
  //     "addr":"台南市-歸仁區",
  //     "weight":"1003"
  //   },
  //   {
  //     "cusName":"易利晟鋼鐵有限公司",
  //     "caseName":"公司用-海光",
  //     "addr":"台南市-歸仁區",
  //     "weight":"1004"
  //   }
  // ]
  $scope.records = []
  var ipObj1 = {
    callback: getPurchaseLists,
    disabledDates: [ //Optional
      new Date(2016, 2, 16),
      new Date(2015, 3, 16),
      new Date(2015, 4, 16),
      new Date(2015, 5, 16),
      new Date('Wednesday, August 12, 2015'),
      new Date("08-16-2016"),
      new Date(1439676000000)
    ],
    inputDate: new Date(), //Optional
    mondayFirst: true, //Optional
    disableWeekdays: [0], //Optional
    closeOnSelect: false, //Optional
    templateType: 'popup' //Optional
  };

  $scope.openDatePicker = function() {
    console.log("@@@@@@")
    ionicDatePicker.openDatePicker(ipObj1);
  };
  getPurchaseLists(new Date());

  function getPurchaseLists(selectDate) {
    $scope.showDate = $filter('date')(selectDate, 'yyyy-MM-dd');
    return $http.post(SERVER_CONFIG.PROTOCOL + SERVER_CONFIG.BRIDGE + 'get_OrderMaster_List', {
        TodaySearchDate: $scope.showDate
      })
      .then(function(result) {
        console.log("result", result.data.resources)
        $scope.records = result.data.resources
      })
  }
});
