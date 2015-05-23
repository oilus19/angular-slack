'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:PagesChatCtrl
 * @description
 * # PagesChatCtrl
 * Controller of the getnearApp
 */
angular.module('getnearApp')
  .controller('ChatCtrl', function ($rootScope, $scope, $resource, $stateParams) {
	$rootScope.currentGroup = $rootScope.getGroup($stateParams.group);
    $rootScope.chatWith = $rootScope.getUser($stateParams.user);

    $scope.post = false;

    $scope.sendMessage = function(){
    	var body = $scope.messageinput;
    	var message = {
    		type: 'out',
    		body: body,
    		timeline: 'Just now'
    	}
    	$rootScope.messages.push(message);
    	$scope.messageinput = '';
    }
  });
