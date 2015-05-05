'use strict';

/**
 * @ngdoc directive
 * @name getnearApp.directive:anchorScroll
 * @description
 * # anchorScroll
 */
angular.module('getnearApp')
  .directive('anchorScroll', ['$location', '$anchorScroll', function($location, $anchorScroll) {
    return {
      restrict: 'AC',
      link: function(scope, el, attr) {
        el.on('click', function(e) {
          $location.hash(attr.anchorScroll);
          $anchorScroll();
        });
      }
    };
  }]);
