'use strict';

/**
 * @ngdoc directive
 * @name getnearApp.directive:vectorMap
 * @description
 * # vectorMap
 */
angular.module('getnearApp')
  .directive('vectorMap', function () {
    return {
      restrict: 'AE',
      scope: {
        options: '='
      },
      link: function postLink(scope, element) {
        var options = scope.options;
        element.vectorMap(options);
      }
    };
  });
