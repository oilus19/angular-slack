'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:PagesProfileCtrl
 * @description
 * # PagesProfileCtrl
 * Controller of the getnearApp
 */
angular.module('getnearApp')
  .controller('ProfileCtrl', function ($scope) {
    $scope.page = {
      title: 'Profile Page',
      subtitle: 'Place subtitle here...'
    };
  });
