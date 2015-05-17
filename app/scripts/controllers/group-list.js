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

        $scope.joinGroup = function(group) {
            $rootScope.joinedGroup.push(group);
            $state.go("app.group.channel",{group: group.title, channel: 'General'});
        }

        $rootScope.groupfilter = {};
  });

