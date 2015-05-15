'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:GroupCtrl
 * @description
 * # GroupCtrl
 * Controller of the getnearApp
 */
angular.module('getnearApp')
  .controller('GroupCtrl', function ($scope, $timeout, $stateParams, $modal) {
    $scope.$parent.currentGroup = $scope.$parent.getGroup($stateParams.group);
        
  });

