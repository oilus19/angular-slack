'use strict';

/**
 * @ngdoc directive
 * @name getnearApp.directive:TileControlClose
 * @description
 * # TileControlClose
 */
angular.module('getnearApp')
  .directive('tileControlClose', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        var tile = element.parents('.tile');

        element.on('click', function() {
          tile.addClass('closed').fadeOut();
        });
      }
    };
  });
