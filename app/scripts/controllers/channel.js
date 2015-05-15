'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:ChannelCtrl
 * @description
 * # ChannelCtrl
 * Controller of the getnearApp
 */
angular.module('getnearApp')
    .controller('ChannelCtrl', function ($scope, $timeout, $stateParams, $modal) {

    $scope.$parent.currentChannel = $scope.$parent.getChannel($stateParams.channel);

    $scope.$parent.resize();

    $scope.$parent.getPostBody = function(post){
        return post.body;
    }

    $scope.$parent.submitPost = function(){
        function getPostType(post){
            if(post.indexOf('q:') === 0) return 'q';
            if(post.indexOf('@') === 0) return '@';
            if(post.indexOf('e:') === 0) return 'e';
            if(post.indexOf('p:') === 0) return 'p';
        }

        function getPostBody(post){
            return post.substr(post.indexOf(':')+1).trim();
        }

        function getPostAuthor(post){
            var author = {
                firstname: 'John',
                lastname: 'Douey',
                avatar: 'images/profile-photo.jpg'
            }
            return author;
        }

        function getPostTo(post){
            return post.substr(1,post.indexOf(':')-1).trim();
        }

        function reset(){
            $("#new_post_input").val('');
        }
        
        var post_input = $("#new_post_input").val().trim();
        var postType = getPostType(post_input);
        var postBody = getPostBody(post_input);
        var postAuthor = getPostAuthor(post_input);
        var post = {
            type: postType,
            body: postBody,
            user: postAuthor,
            timeline: "Just Now"
        }

        switch(postType){
            case 'q':
                $scope.$parent.posts.push(post);
                break;
            case '@':
                post.to = getPostTo(post_input);
                $scope.$parent.posts.push(post);
                break;
            case 'e':
                $scope.$parent.newEvent();
                break;
            case 'p':
                $scope.$parent.newPoll();
                break;
        }

        reset();
    }

    /*  Mentions     */

    $scope.$parent.showMention = function(mention){
        $scope.$parent.mention = mention;
        $scope.$parent.mentionsScope.mentionShowed = true;
        $timeout(function(){
            angular.element($("#rightbar .nav-tabs li#mentions a")).triggerHandler("click");
        },0);
    }

    $scope.$parent.hideMention = function(mention){
        $scope.$parent.mentionsScope.mentionShowed = false;
    }

    /*  Question and Answer     */

    $scope.$parent.newQuestion = function(){
        $scope.newPost = 'q: ';
        jQuery('#new_post_input').focus();
    }

    $scope.$parent.showQuestion = function(question){
        $scope.$parent.question = question;
        $scope.$parent.questionsScope.questionShowed = true;
        $timeout(function(){
            angular.element($("#rightbar .nav-tabs li#questions a")).triggerHandler("click");
        },0);
    }

    $scope.$parent.hideQuestion = function(question){
        $scope.$parent.questionsScope.questionShowed = false;
    }

    $scope.$parent.replyQuestion = function(question){
        $scope.$parent.showQuestion(question);
        $timeout(function(){
            var $target = $('#new_answer_input');
            $target.focus();
            $("#sidebar").animate({scrollTop: $target.offset().top}, "slow");
        },100);
    }

    $scope.$parent.submitAnswer = function(){
        function getPostBody(post){
            return jQuery('#new_answer_input').val().trim();
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
            jQuery('#new_answer_input').val('');
        }
        
        var postBody = getPostBody();
        var postAuthor = getPostAuthor();
        var answer = {
            body: postBody,
            user: postAuthor
        }

        if($scope.$parent.question.answers==undefined) $scope.$parent.question.answers = [];
        $scope.$parent.question.answers.push(answer);
        reset();
    }

    /*  Poll     */




    $scope.$parent.newPoll = function(){
      var modalInstance = $modal.open({
        templateUrl: 'createPollModalContent.html',
        controller: 'CreatePollModalInstanceCtrl',
        size: 'lg'
      });

      modalInstance.result.then(function (result) {

        function getPostAuthor(){
            var author = {
                firstname: 'John',
                lastname: 'Douey',
                avatar: 'images/profile-photo.jpg'
            }
            return author;
        }

        var poll = {
          type: "p",
          body: result.question,
          options: result.options,
          timeline: "Just now",
          user: getPostAuthor()
        }
        $scope.$parent.posts.push(poll);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    $scope.$parent.showPoll = function(poll){
        $scope.$parent.poll = poll;
        $scope.$parent.pollsScope.pollTotalVotes = 0;
        $scope.$parent.pollsScope.selectedPollOption = null;
        $scope.$parent.pollsScope.pollShowed = true;
        $timeout(function(){
            angular.element($("#rightbar .nav-tabs li#polls a")).triggerHandler("click");
        },0);
        angular.forEach(poll.options, function(option){
            if(option.votes == undefined) return;
            $scope.$parent.pollsScope.pollTotalVotes += option.votes;
        })
    }

    $scope.$parent.hidePoll = function(poll){
        $scope.$parent.pollsScope.pollShowed = false;
    }

    $scope.$parent.submitVote = function(poll){
        if($scope.$parent.pollsScope.selectedPollOption==undefined) return;
        poll.options[$scope.$parent.pollsScope.selectedPollOption].votes ++;
        $scope.$parent.pollsScope.pollTotalVotes ++;
        $scope.$parent.pollsScope.selectedPollOption = null;
    }

    /*  Events     */

    $scope.$parent.newEvent = function(){
      var modalInstance = $modal.open({
        templateUrl: 'createEventModalContent.html',
        controller: 'CreateEventModalInstanceCtrl',
        size: 'lg'
      });

      modalInstance.result.then(function (result) {

        function getPostAuthor(){
            var author = {
                firstname: 'John',
                lastname: 'Douey',
                avatar: 'images/profile-photo.jpg'
            }
            return author;
        }

        var event = {
          type: "e",
          body: result.title,
          info: result.info,
          location: result.location,
          date: result.date,
          time: result.time,
          price: result.price,
          timeline: "Just now",
          user: getPostAuthor()
        }
        $scope.$parent.posts.push(event);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    $scope.$parent.showEvent = function(event){
        $scope.$parent.event = event;
        $scope.$parent.eventsScope.eventShowed = true;
        $timeout(function(){
            angular.element($("#rightbar .nav-tabs li#events a")).triggerHandler("click");
        },0);
    }

    $scope.$parent.hideEvent = function(event){
        $scope.$parent.eventsScope.eventShowed = false;
    }

    $scope.$parent.submitEvent = function(){
    }

    /*  Pinned Items     */

    $scope.$parent.showPinnedItem = function(pinnedItem){
        switch(pinnedItem.type){
            case '@':
                $scope.$parent.showMention(pinnedItem);
                break;
            case 'e':
                $scope.$parent.showEvent(pinnedItem);
                break;
            case 'p':
                $scope.$parent.showPoll(pinnedItem);
                break;
            case 'q':
                $scope.$parent.showQuestion(pinnedItem);
                break;
        }
    }

    $scope.$parent.setPinned = function(pinnedItem){
        pinnedItem.pinned = true;
        $timeout(function(){
            angular.element($("#rightbar .nav-tabs li#pinned_items a")).triggerHandler("click");
        },0);
    }

    $scope.$parent.unsetPinned = function(pinnedItem){
        delete pinnedItem.pinned;
    }


    /* Channel */

    $scope.$parent.submitChannel = function(title){
        var channel = {
            title: title,
            initial: title.charAt(0).toUpperCase()
        }
        $scope.$parent.channels.push(channel);
        $('.suggest-channel .dropdown-menu').toggle();
    }

  });


angular.module('getnearApp')
  .directive('autoComplete', function ($timeout) {
    return function(scope, iElement, iAttrs){
        var $input = $("#new_post_input");
        $input.autocomplete({
            source: scope[iAttrs.uiItems],
            select: function(){
                $timeout(function(){
                    iElement.trigger('input');
                },0)
            }
        });
    };
});


angular.module('getnearApp')
  .controller('CreatePollModalInstanceCtrl', function ($scope, $modalInstance) {

    $scope.options = [{
        title: "",
        votes: 0
    },{
        title: "",
        votes: 0
    }];

    $scope.create = function () {
      $modalInstance.close({question: $scope.question, options: $scope.options});
    };

    $scope.addQuestion = function() {
        $scope.options.push({title: "", votes: 0});
    }
  })

  .controller('CreateEventModalInstanceCtrl', function ($scope, $modalInstance) {
    
    $scope.price = "$ ";
    $scope.free = true;
    $scope.dt = new Date();
    $scope.mytime = new Date();

    $scope.create = function () {
      var date = $scope.dt.toLocaleDateString();
      var time = $scope.mytime.toLocaleTimeString();
      $modalInstance.close({title: $scope.title, info: $scope.info, location: $scope.location, date: date, time: time, price: (($scope.free==true)?'free':$scope.price)});
    };
  })

  .controller('DatepickerCtrl', function ($scope) {

    $scope.today = function() {
      $scope.dt = new Date();
    };

    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      'class': 'datepicker'
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
  })
  .controller('TimepickerCtrl', function ($scope) {
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
      var d = new Date();
      d.setHours( 14 );
      d.setMinutes( 0 );
      $scope.mytime = d;
    };

    $scope.changed = function () {
      console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
      $scope.mytime = null;
    };
  });
