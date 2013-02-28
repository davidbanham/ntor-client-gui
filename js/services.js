angular.module('socketService', []).
	factory('Socket', function($rootScope) {
	var Socket = io.connect(window.localStorage.url);
	return{
		on: function(eventName, callback) {
			Socket.on(eventName, function(data) {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(Socket, args);
				}); 
			}); 
		},
		emit: function (eventName, data, callback) {
			Socket.emit(eventName, data, function () {
				var args = arguments;
				$rootScope.$apply(function () {
					if (callback) {
						callback.apply(socket, args);
					}
				});
			})
		}
	};  
});
angular.module('queueService', ['ngResource']).
	factory('Queue', function($resource){
	return $resource(window.localStorage.url+'\:3001/queue/:target', {target: '@target'}, {
		newItem: {method: 'POST', target: 'item'}
		, remove: {method: 'POST', target: 'remove'}
	});     
});
