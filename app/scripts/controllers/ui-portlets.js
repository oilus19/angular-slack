'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:UiPortletsCtrl
 * @description
 * # UiPortletsCtrl
 * Controller of the getnearApp
 */
angular.module('getnearApp')
  .controller('PortletsCtrl', function ($scope) {
    $scope.page = {
      title: 'Portlets',
      subtitle: 'Place subtitle here...'
    };
  });
