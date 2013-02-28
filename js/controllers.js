var dlProcs = {};
function UtilsCtrl($scope, $http, $location) {
	$scope.url = window.localStorage.url;
	$scope.updateURL = function(url) {
		window.localStorage.url = url;
	};
	$scope.logout = function() {
		$http.get(window.localStorage.url+'/logout').success(
			function(data) {
			$location.path('/login');
		}
		)
	};
	$scope.downloadLocation = window.localStorage.downloadLocation;
	$scope.setFile = function(element) {
		$scope.$apply(function($scope) {
			$scope.fileElem = element.files[0];
			$scope.downloadLocation = element.files[0].path;
			window.localStorage.downloadLocation = element.files[0].path;
		});
	};
};
function QueueCtrl($scope, Queue, $http, $location, Socket) {
	Socket.on('diskSpace', function(diskSpace) {
		console.log(diskSpace);
	});
	Socket.on('queueItem', function(data) {
		if (data.action == 'delete') {
			if ( dlProcs[data.path] ) {
				console.log("Item in progress deleted from queue, ending.", data);
				dlProcs[data.path].end();
				delete dlProcs[data.path];
			}
		};
		updateQueue();
	});
	var request = require('request');
	var fs = require('fs');
	var tar = require('tar');
	var grab = function(item) {
		console.log("Grab called on ", item);
		if (dlProcs[item.path]) {
			console.log("Grab already in progress", item);
			return null;
		};
		item.totalDown = 0;
		var remoteUrl = window.localStorage.url+'/tar?path='+encodeURIComponent(item.path)+'&sessu='+encodeURIComponent(window.localStorage.sid);
		var req = request.get(remoteUrl).pipe(tar.Extract({ path: window.localStorage.downloadLocation }));
		dlProcs[item.path] = req;
		var lastPercentage = 0;
		req.on('data', function(data) {
			item.totalDown += data.length;
			item.percentDown = (item.totalDown / item.size * 100).toFixed(2);
			$scope.$apply()
			if (item.percentDown.split('.')[0] !== lastPercentage) {
				Socket.emit('progress', {name: item.name, totalDown: item.totalDown, percentDown: item.percentDown});
				lastPercentage = item.percentDown.split('.')[0];
				console.log(lastPercentage);
			};
		});
		req.on('end', function() {
			console.log("Dl process has been ended", item);
			remove(item);
			delete dlProcs[item.path];
		});
	};
	$scope.grab = grab;
	function updateQueue() {
		$scope.queue = Queue.query({}, function(queue){
			if (queue[0]) grab(queue[0]);
		});
	};
	function remove(item) {
		Queue.remove({target: "remove", path: item.path});
	};
	$scope.remove = remove;
	updateQueue();
	$scope.bytesToSize = function (bytes, precision) {
		{  
			var kilobyte = 1024;
			var megabyte = kilobyte * 1024;                        
			var gigabyte = megabyte * 1024;
			var terabyte = gigabyte * 1024;                        

			if ((bytes >= 0) && (bytes < kilobyte)) {
				return bytes + ' B';

			} else if ((bytes >= kilobyte) && (bytes < megabyte)) {
				return (bytes / kilobyte).toFixed(precision) + ' KB';
			} else if ((bytes >= megabyte) && (bytes < gigabyte)) {
				return (bytes / megabyte).toFixed(precision) + ' MB';

			} else if ((bytes >= gigabyte) && (bytes < terabyte)) {
				return (bytes / gigabyte).toFixed(precision) + ' GB';

			} else if (bytes >= terabyte) {
				return (bytes / terabyte).toFixed(precision) + ' TB';

			} else {
				return bytes + ' B';
			}
		}
	};
};
function LoginCtrl($scope, $http, $location, Socket) {
	$http.get(window.localStorage.url+'/checkAuth').success(
		function(data){
		console.log(data);
		Socket.emit('online', require('os').hostname());
		window.localStorage.sid = data.sid;
		window.localStorage.email = data.email;
		console.log(window.localStorage.sid);
		$location.path('/queue');
	}
	);
	$scope.login = function(){
		$http.post(window.localStorage.url+'/login', {
			username: $scope.username
			, password: $scope.password
		}).success(
		function(data, status, headers){
			$location.path('/queue');
		}
		).error(
		function(data){
			$scope.response = "Error! " + data;
			console.log("error!", data);
		}
		)
	};
};
