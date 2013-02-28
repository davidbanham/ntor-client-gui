angular.module('ntor-gui', ['socketService', 'queueService', 'ngCookies']).
	config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/login', {templateUrl: 'partials/login.html', controller: LoginCtrl}).
		when('/queue', {templateUrl: 'partials/queue.html', controller: QueueCtrl}).
		when('/utils', {templateUrl: 'partials/utils.html', controller: UtilsCtrl}).
		otherwise({redirectTo: '/login'});
}]);
