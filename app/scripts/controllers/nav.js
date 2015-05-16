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

    $('html').click(function(){
    	$('.suggest-channel .dropdown-menu').hide();
    });

    $('.suggest-channel .dropdown-menu').click(function(event){
    	event.stopPropagation();
    })
  });