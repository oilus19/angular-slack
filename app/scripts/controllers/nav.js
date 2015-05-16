'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the getnearApp
 */

angular.module('getnearApp')
  .controller('NavCtrl', function ($scope) {
    $scope.oneAtATime = false;

    $scope.status = {
      isFirstOpen: true,
      isSecondOpen: true,
      isThirdOpen: true
    };      

    $scope.$parent.resize();

    $scope.navtoggle = function(open){
    	if(open) 
    		$("#sidebar").addClass('dropdown-open');
    	else
    		$("#sidebar").removeClass('dropdown-open');
    };
  });