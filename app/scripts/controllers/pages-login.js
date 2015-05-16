'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:PagesLoginCtrl
 * @description
 * # PagesLoginCtrl
 * Controller of the getnearApp
 */
angular.module('getnearApp')
  .controller('LoginCtrl', function ($scope, $state) {
    $scope.login = function() {
      $state.go('app.grouplist');
    };
  });
