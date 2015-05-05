'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:PagesChatCtrl
 * @description
 * # PagesChatCtrl
 * Controller of the getnearApp
 */
angular.module('getnearApp')
  .controller('ChatCtrl', function ($scope, $resource) {
    $scope.inbox = $resource('scripts/jsons/chats.json').query();

    $scope.archive = function(index) {
      $scope.inbox.splice(index, 1);
    };
  });
