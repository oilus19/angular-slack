'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:GroupListCtrl
 * @description
 * # GroupListCtrl
 * Controller of the getnearApp
 */
angular.module('getnearApp')
    .controller('GroupListCtrl', function ($rootScope, $scope, $timeout, $modal, $state) {
        $rootScope.groupfilter = {};
    	$rootScope.currentGroup = {};
  });

