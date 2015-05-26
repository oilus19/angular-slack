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
  $(".page-channel .streamline-form-wrapper").width($("#content").width()-60);
}

function positionSendMessageBox(){
  $(".page-chat .send-message-wrapper").width($("#content").width()-60);
}

function positionPageHeader(){
  $(".pageheader-inner").width($("#content").width()-30);
}

function scrollTop(){
  $("html, body").animate({ scrollTop: 0 }, 1000);
}


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

  setTimeout(function(){ 
    positionPageHeader();
    positionSendMessageBox();
    positionNewPostBox();
    positionNewPostButton();
  }, 100);
}

$(window).bind("load", function() { 

  $(window)
    .resize(resize);
});
