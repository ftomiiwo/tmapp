angular.module('ionicApp', ['ionic', 'ngCordova', 'ionicApp.Main', 'ionicApp.UserList', 'ionicApp.Map'])

    .config(function($urlRouterProvider){
      //Default Route for the whole app
      $urlRouterProvider.otherwise('/main');
    });
angular.module('ionicApp.Main', ['ionic'])

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('main', {
        url: "/main",
        templateUrl: "templates/main.html",
        controller: 'MainCtrl'
      });
})

    .controller("MainCtrl",function(){
      console.log("Main Controller says: Hello World");
    });

angular.module('ionicApp.UserList', ['ionic'])

  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('UserList', {
      		url: "/UserList",
      		templateUrl: "templates/UserList.html",
      		controller: "UserListCtrl"
      	})
      .state('UserListDetail', {
        url: "/userListDetail/:index",
        templateUrl: "templates/UserListDetail.html",
        controller: "UserListDetailCtrl"
      })
      .state('PicModal', {
        url: "/PicModal",
        templateUrl: "templates/PicModal.html",
        controller: "PicModalCtrl"
      })
})

.factory('userService', function($http) {
  var users = [];
  return {
    getUsers: function() {
      return $http.get('https://randomuser.me/api/?results=10').then(function(response){
        console.log(response);
        users = response.data.results; //Populate the new variable
        return response.data.results;
      });
    },
    getUser: function(index) {
      // console.log(index);
      return users[index];
    },
    getPicture: function(index) {
      return users[picture];
    }
  }
})

.controller("UserListCtrl",function($scope, userService){
	userService.getUsers().then(function(users){
		$scope.users = users;
	});
})
.controller("UserListDetailCtrl", function($scope, $stateParams, userService) {
  var index = $stateParams.index;
  $scope.item = userService.getUser(index);
})
.controller("PicModalCtrl", function($scope, $stateParams, $stateProvider) {
  $scope.picture = userService.getPicture(index);
});

angular.module('ionicApp.Map', ['ionic', 'ngCordova'])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('map', {
          url: '/map',
          templateUrl: 'templates/map.html',
          controller: 'MapCtrl'
        });
      $urlRouterProvider.otherwise('/main');
    })
    .controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
      var options = {timeout: 10000, enableHighAccuracy: false};
      console.log("Map Controller says: Hello World");
      $cordovaGeolocation
      .getCurrentPosition(options)
      .then(function(position)
      {
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.log(latLng);
        var mapOptions = {center: latLng, zoom: 15, mapTypeId: google.maps.MapTypeId.ROADMAP};
        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      },
      {
        function(error) {
          console.log("Could not get location");
        }
      });
    });
