// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers','ionic-datepicker'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
  $ionicConfigProvider.tabs.position("bottom");
  $ionicConfigProvider.navBar.alignTitle("center");
  $ionicConfigProvider.tabs.style("standard");
  $httpProvider.interceptors.push(function(){
    return {
      'request': function(config){
        if(config && !config.headers){
          config.headers = {};
        }
        config.headers["Authorization"] = "Bearer" + " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJwZXJtaXNzaW9ucyI6WyJnZW5lcmFsUmVhZCIsImdlbmVyYWxVcGRhdGUiXSwiaWF0IjoxNDkwNzc2Mzc1LCJleHAiOjQxMDI0NDQ4MDB9.vmu8sA3n6ToGkr3AhmV2bwCaE2MttY89WsL_2v9UFjc"
        return config
      }

    }
  })

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.homemenu', {
        url: "/homemenu",
        abstract: true,
        views: {
        'home-tab': {
          templateUrl: "templates/homemenu.html",
        }
      }
      })
    .state('tabs.homemenu.home', {
      url: "/home",
      views: {
        'menuContent': {
          templateUrl: "templates/home.html",
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.homemenu.todaySold', {
      url: "/todaySold",
      views: {
        'menuContent': {
          templateUrl: "templates/todaySold.html",
          controller:"SearchSoldCtrl"
        }
      }
    })
    .state('tabs.homemenu.statis', {
      url: "/statis",
      views: {
        'menuContent': {
          templateUrl: "templates/statis.html"
        }
      }
    })
    .state('tabs.homemenu.todayOrder', {
      url: "/todayOrder",
      views: {
        'menuContent': {
          templateUrl: "templates/todayOrder.html",
          controller:"SearchOrderCtrl"
        }
      }
    })
    .state('tabs.homemenu.newCustomer', {
      url: "/newCustomer",
      views: {
        'menuContent': {
          templateUrl: "templates/newCustomer.html"
        }
      }
    })
    .state('tabs.homemenu.todayConsignment', {
      url: "/todayConsignment",
      views: {
        'menuContent': {
          templateUrl: "templates/todayConsignment.html",
          controller:"SearchConsignmentCtrl",
          cache:false
        }
      }
    })
    .state('tabs.homemenu.todayPurchase', {
      url: "/todayPurchase",
      views: {
        'menuContent': {
          templateUrl: "templates/todayPurchase.html",
          controller:"SearchPurchaseCtrl"
        }
      }
    })
    .state('tabs.homemenu.contractRemain', {
      url: "/contractRemain",
      views: {
        'menuContent': {
          templateUrl: "templates/contractRemain.html"
        }
      }
    })
    .state('tabs.contact', {
      url: "/contact",
      views: {
        'contact-tab': {
          templateUrl: "templates/contact.html"
        }
      }
    })
    .state('tabs.homemenu.stockCustomer', {
      url: "/stockCustomer",
      views: {
        'menuContent': {
          templateUrl: "templates/stockCustomer.html",
          controller:"StockCustomerCtrl"
        }
      }
    })
    .state('tabs.homemenu.stockStorage', {
      url: "/stockStorage",
      views: {
        'menuContent': {
          templateUrl: "templates/stockStorage.html",
          controller:"StockStorageCtrl"
        }
      }
    })
    .state('tabs.homemenu.stockDrawer', {
      url: "/stockDrawer",
      views: {
        'menuContent': {
          templateUrl: "templates/stockDrawer.html",
          controller:"StockDrawerCtrl"
        }
      }
    })
    .state('tabs.message', {
      url: "/message",
      views: {
        'message-tab': {
          templateUrl: "templates/message.html",
          controller:"MessageCtrl"
        }
      }
    })

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      });
    ;


   // $urlRouterProvider.otherwise("/tab/homemenu/home");
   $urlRouterProvider.otherwise("/login");

})
CONTROLLERS = angular.module('starter.controllers', []);
