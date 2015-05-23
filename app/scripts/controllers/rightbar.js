'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:RightbarCtrl
 * @description
 * # RightbarCtrl
 * Controller of the getnearApp
 */

angular.module('getnearApp')
  .controller('RightbarCtrl', function ($rootScope, $scope) {

  });

function positionNewPostButton () {
  var $new_post = $("#rightbar .tab-content .tab-pane.active .new-post");

  var new_post_height = $new_post.height();

  if ( ($('#rightbar .ng-isolate-scope').height()+new_post_height) < $('#rightbar').height()) {
     $new_post.removeClass('static');
  } else {
     $new_post.addClass('static');
  }
       
};

function resize(){
  var width = ($(window).width()-$('#sidebar').width())*0.3;
  width = (width<280) ? 280: width;
  $("#rightbar").width(width);
  var content_width = $(window).width()-$('#sidebar').width()-width;
  $("#content").css('right', width.toString()+"px");
}

$(window).bind("load", function() { 

  $(window)
    .resize(positionNewPostButton)
    .resize(resize);

});
