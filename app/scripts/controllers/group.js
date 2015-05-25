'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:GroupCtrl
 * @description
 * # GroupCtrl
 * Controller of the getnearApp
 */
angular.module('getnearApp')
  .controller('GroupCtrl', function ($scope, $timeout, $stateParams, $modal) {  
  });


function positionNewPostBox(){

  var scrollTop = $(window).scrollTop();
  var top = scrollTop;
  $(".page-channel .streamline-form-wrapper").css('top', top.toString() + 'px');

}

function positionSendMessageBox(){

  var scrollTop = $(window).scrollTop();
  var top = scrollTop;
  $(".page-chat .send-message-wrapper").css('top', top.toString() + 'px');
}

function positionPageHeader(){
  var scrollTop = $(window).scrollTop();
  var top = scrollTop;
  $(".pageheader").css('top', top.toString() + 'px');
}

function scrollTop(){
  $("html, body").animate({ scrollTop: 0 }, 1000);
}

$(window).bind("load", function() { 

  $(window)
    .scroll(positionNewPostBox)
    .scroll(positionSendMessageBox)
    .scroll(positionPageHeader)
    .resize(positionNewPostBox)
    .resize(positionSendMessageBox);

});