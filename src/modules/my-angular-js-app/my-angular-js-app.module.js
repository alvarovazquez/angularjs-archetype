'use strict';

var myApp = angular.module('myAngularJsApp', ['ngRoute']);

myApp.config(['$routeProvider', function config($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'templates/hello-world.html'
		})
		.otherwise('/');
}]);