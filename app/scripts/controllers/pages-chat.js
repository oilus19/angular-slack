'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:PagesChatCtrl
 * @description
 * # PagesChatCtrl
 * Controller of the getnearApp
 */
angular.module('getnearApp')
  .controller('ChatCtrl', function ($scope, $resource, $stateParams) {
	$scope.$parent.currentGroup = $scope.$parent.getGroup($stateParams.group);
    $scope.chatWith = $scope.$parent.getUser($stateParams.user);

  });
