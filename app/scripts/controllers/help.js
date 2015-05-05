'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:HelpCtrl
 * @description
 * # HelpCtrl
 * Controller of the getnearApp
 */
angular.module('getnearApp')
  .controller('HelpCtrl', function ($scope) {
     $scope.page = {
      title: 'Documentation',
      subtitle: 'Place subtitle here...'
    };
  });
