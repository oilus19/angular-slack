'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:GroupListCtrl
 * @description
 * # GroupListCtrl
 * Controller of the getnearApp
 */
angular.module('getnearApp')
    .controller('GroupListCtrl', function ($scope, $timeout, $modal, $state) {

        $scope.joinGroup = function(group) {
            $scope.$parent.joinedGroup.push(group);
            $state.go("group.channel",{group: group.title, channel: 'General'});
        }

        $scope.$parent.groupfilter = {};
  });

