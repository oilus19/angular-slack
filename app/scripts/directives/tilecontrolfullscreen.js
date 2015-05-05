'use strict';

/**
 * @ngdoc directive
 * @name getnearApp.directive:tileControlFullscreen
 * @description
 * # tileControlFullscreen
 */
angular.module('getnearApp')
  .directive('tileControlFullscreen', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        var dropdown = element.parents('.dropdown');

        element.on('click', function(){
          dropdown.trigger('click');
        });

      }
    };
  });
