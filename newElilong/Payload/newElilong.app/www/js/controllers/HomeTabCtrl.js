CONTROLLERS.controller('HomeTabCtrl', function($scope, $q, $http, $filter, $state) {

  $scope.ThisDate = new Date();
  $scope.DisplayingDate = $filter('date')($scope.ThisDate, 'yyyy-MM-dd');

  ReSetData();

  getTodayInformation();

  getEZInformation();

  // --------------------------------------------------------------------------------
  // ------------------------------ Global Functions --------------------------------
  // --------------------------------------------------------------------------------
  $scope.NextDay = function() {
    console.log('NextDay Function');
    $scope.ThisDate.setDate($scope.ThisDate.getDate() + 1);
    $scope.DisplayingDate = $filter('date')($scope.ThisDate, 'yyyy-MM-dd');
    console.log("$scope.DisplayingDate", $scope.DisplayingDate)
    getDataByDate($scope.DisplayingDate);
    getEZDataByDate($scope.DisplayingDate);

    // ---
  }

  $scope.PreviousDay = function() {
    console.log('PreviousDay Function');
    $scope.ThisDate.setDate($scope.ThisDate.getDate() - 1);
    $scope.DisplayingDate = $filter('date')($scope.ThisDate, 'yyyy-MM-dd');
    getDataByDate($scope.DisplayingDate);
    getEZDataByDate($scope.DisplayingDate);

    // ---
  }

  $scope.BackToday = function() {
    console.log('BackToday Function');
    $scope.ThisDate = new Date();
    $scope.DisplayingDate = $filter('date')($scope.ThisDate, 'yyyy-MM-dd');
    getDataByDate($scope.DisplayingDate);
    getEZDataByDate($scope.DisplayingDate);
    // ---
  };

  // --------------------------------------------------------------------------------
  // ------------------------------ Local Functions ---------------------------------
  // --------------------------------------------------------------------------------
  function ReSetData() {
    console.log('ResetData Function');
    //
    // $scope.Inventory = '0';        // 廠內庫存量
    // $scope.PurchaseUnIn = '0';     // 已採購未進量
    // $scope.LendOut='0';            // 借出總量
    // $scope.PositiveSum='0';        // +
    // //
    // $scope.UnSaleContract = '0';   // 合約未交量
    // $scope.UnSaleOrder = '0';      // 訂單未交量
    // $scope.BorrowIn = '0';         // 借入總量
    // $scope.NegativeSum='0';        // -

    //
    $scope.TodayCut = '0';
    $scope.TodayOrder = '0'; // 今日訂單
    $scope.TodayPrice = '0'; // 今日牌價
    $scope.TodayPurchase = '0'; // 今日出貨
    $scope.TodaySale = '0'; // 今日貨噸
  };


  function getTodayInformation() {

    console.log('getTodayInformation Function');

    getDataByDate($filter('date')(new Date(), 'yyyy-MM-dd'));

  };

  function getDataByDate(SelectDate) {
    var QueryDate = $filter('date')(SelectDate, 'yyyy-MM-dd');
    console.log('getTodayInformation Function - QueryDate ---------------------------- ' + QueryDate);
    var deferred = $q.defer();
    // var postUrl = SERVER_CONFIG.PROTOCOL + SERVER_CONFIG.ADDR + SERVER_CONFIG.PATH + 'get_Today_Information';
    var postUrl = SERVER_CONFIG.PROTOCOL + SERVER_CONFIG.BRIDGE + 'get_Today_Information';
    ReSetData(); // Clear Buffer
    console.log("postUrl",postUrl)
    $http.post(postUrl, {
        'TodaySearchDate': QueryDate
      })
      .then(function(data) {
        console.log('[SUCCESS] data:' ,data);

        $scope.TodayCut = data.data.strTodayCut;
        $scope.TodayOrder = data.data.strTodayOrder; // 今日訂單
        $scope.TodayPrice = data.data.strTodayPrice; // 今日牌價
        $scope.TodayPurchase = data.data.strTodayPurchase; // 今日出貨
        $scope.TodaySale = data.data.strTodaySale; // 今日貨噸
        deferred.resolve();
      })
      .catch(function(data) {
        console.log($filter('date')(new Date(), '--------------------------------------- yyyy-MM-dd HH:mm:ss'));
        console.log('[ERROR] data: ' + data);
        // console.log('[ERROR] status: ' + status);
        deferred.reject('請檢查網路連線!');
      });
    return deferred.promise;
  };



  function getEZInformation() {

    console.log('getEZInformation Function');

    getEZDataByDate($filter('date')(new Date(), 'yyyy-MM-dd'));

  };

  function getEZDataByDate(SelectDate) {
    var QueryDate = $filter('date')(SelectDate, 'yyyy-MM-dd');
    console.log('getEZInformation Function - QueryDate ---------------------------- ' + QueryDate);
    var deferred = $q.defer();

    // var postUrl = SERVER_CONFIG.PROTOCOL + SERVER_CONFIG.ADDR + SERVER_CONFIG.PATH + 'get_EZ_Information';
    var postUrl = SERVER_CONFIG.PROTOCOL + SERVER_CONFIG.BRIDGE +  'get_EZ_Information';
    //ReSetData();  // Clear Buffer

    $http.post(postUrl, {
        'TodaySearchDate': QueryDate
      })
      .then(function(data, status, header, config) {
        console.log('[SUCCESS] data:' + $filter('json')(data) + "status:" + $filter('json')(status));

        $scope.Inventory = data.data.Inventory; // 廠內庫存量
        $scope.InventoryPrice = data.data.InventoryPrice; // 廠內庫存量平均價格
        $scope.PurchaseUnIn = data.data.PurchaseUnIn; // 已採購未進量
        $scope.PurchaseUnInPrice = data.data.PurchaseUnInPrice; // 已採購未進量平均價格
        $scope.LendOut = data.data.LendOut; // 借出總量
        $scope.PositiveSum = parseInt(data.data.Inventory, 10) + parseInt(data.data.PurchaseUnIn, 10) + parseInt(data.data.LendOut, 10); // +
        //
        $scope.UnSaleContract = data.data.UnSaleContract; // 合約未交量
        $scope.UnSaleContractPrice = data.data.UnSaleContractPrice; // 合約未交量平均價格
        $scope.UnSaleOrder = data.data.UnSaleOrder; // 訂單未交量
        $scope.UnSaleOrderPrice = data.data.UnSaleOrderPrice; // 訂單未交量平均價格
        $scope.BorrowIn = data.data.BorrowIn; // 借入總量
        $scope.NegativeSum = parseInt(data.data.UnSaleContract, 10) + parseInt(data.data.UnSaleOrder, 10) + parseInt(data.data.BorrowIn, 10);
        $scope.ModifityDate = data.data.ModifityDate;
        $scope.TotalWeight = $scope.PositiveSum - $scope.NegativeSum;
        deferred.resolve();
      })
      .catch(function(data, status, header, config) {
        console.log($filter('date')(new Date(), '--------------------------------------- yyyy-MM-dd HH:mm:ss'));
        console.log('[ERROR] data: ' + data);
        console.log('[ERROR] status: ' + status);
        deferred.reject('請檢查網路連線!');
      });
    return deferred.promise;
  };
});
