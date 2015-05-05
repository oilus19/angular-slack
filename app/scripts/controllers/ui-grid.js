'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:UiGridCtrl
 * @description
 * # UiGridCtrl
 * Controller of the getnearApp
 */
angular.module('getnearApp')
  .controller('GridCtrl', function ($scope) {
    $scope.page = {
      title: 'Grid',
      subtitle: 'Place subtitle here...'
    };
  });
