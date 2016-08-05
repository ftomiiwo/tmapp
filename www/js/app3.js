/**************************************************
+	Module:		ionicApp
**************************************************/
angular.module('ionicApp', ['ionic','ionicApp.Main','ionicApp.UserList'])

.config(function($urlRouterProvider){
  //Default Route for the whole app
  $urlRouterProvider.otherwise('/main');
});

/**************************************************
+	Module:		ionicApp.Main
+	Exports:
+		MainCtrl
**************************************************/
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

/**************************************************
+	Module:		ionicApp.Page2
+	Exports:
+		userService
+		Page2Ctrl
**************************************************/
angular.module('ionicApp.UserList', ['ionic'])

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('UserList', {
  		url: "/UserList",
  		templateUrl: "templates/UserList.html",
  		controller: "UserListCtrl"
  	})
  .state('userListDetail', {
    url: "/userListDetail/:index",
    templateUrl: "templates/UserListDetail.html",
    controller: "UserListDetailCtrl"
  })
})

.factory('userService', function($http) {

  var users = [];
	return {
		getUsers: function() {
      return $http.get('https://randomuser.me/api/?results=10').then(function(response){
    		users = response.data.results; //Populate the new variable
    		return response.data.results;
    	});
		},
    getUser: function(index) {
      return users[index];
    }
	}
})
.controller("userListDetailCtrl", function($scope, $stateParams, userService) {
  var index = $stateParams.index;
  $scope.item = userService.getUser(index);
})
.controller("UserListCtrl",function($scope, userService){
	userService.getUsers().then(function(users){
		$scope.users = users;
	});
});
