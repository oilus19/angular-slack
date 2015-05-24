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
    $rootScope.resize = function(){
      resize();
    }



  })
  .controller('NewAnswerCtrl', function ($rootScope, $scope) {

    $scope.newAnswerInput = jQuery('#new_answer_input');

    $scope.submitAnswer = function(){
      function getPostBody(post){
          return $scope.newAnswer;
      }

      function getPostAuthor(){
          var author = {
              firstname: 'John',
              lastname: 'Douey',
              avatar: 'images/profile-photo.jpg'
          }
          return author;
      }

      function reset(){
          $scope.newAnswer = '';
      }
      
      var postBody = getPostBody().trim();
      if(postBody=='') return;
      var postAuthor = getPostAuthor();
      var answer = {
          body: postBody,
          user: postAuthor
      }

      if($rootScope.question.answers==undefined) $rootScope.question.answers = [];
      $rootScope.question.answers.push(answer);
      reset();
    }

    $scope.keyPress = function($event){
      if($event.which==13){
        $scope.submitAnswer();
      }
    }

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
