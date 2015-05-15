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
      title: 'Profile Page'
    };

	$scope.setLayout = function() {
	    $('body').removeClass('rightbar-show').addClass('rightbar-hidden').addClass('rightbar-disabled');
	    $('#content').css('left','0');
	}
  });
