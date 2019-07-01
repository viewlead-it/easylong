CONTROLLERS.controller('SearchSoldCtrl', function($scope, $state, $filter, $http, ionicDatePicker) {
  $scope.records = []
  var ipObj1 = {
    callback: getSoldLists,
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

  getSoldLists(new Date());

  function getSoldLists(selectDate) {
    $scope.showDate = $filter('date')(selectDate, 'yyyy-MM-dd');
    return $http.get(SERVER_CONFIG.PROTOCOL + SERVER_CONFIG.NEWSERVICE + 'SaleMaster', {
        params: {
          saleDate: {
            $between: [moment(selectDate).startOf('day').toDate(), moment(selectDate).add(1, 'day').toDate()]
          }
        },
        paramSerializer: '$httpParamSerializerJQLike'
      })
      .then(function(result) {
        console.log("result", result.data)
        for (var idx in result.data) {
          var tmpDetail = result.data[idx].SaleDetails
          var weight = 0;
          for (var idx2 in tmpDetail) {
            weight += tmpDetail[idx2].amount;
          }
          result.data[idx]['weight'] = weight
        }
        $scope.records = result.data
      })
  }
});
