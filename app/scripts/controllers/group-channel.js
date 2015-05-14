'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:GroupChannelCtrl
 * @description
 * # GroupChannelCtrl
 * Controller of the getnearApp
 */
angular.module('getnearApp')
    .controller('GroupChannelCtrl', function ($scope, $timeout, $modal) {
    $scope.$parent.suggestions = ['@John Douey: '];
    $scope.$parent.questionsScope = {};
    $scope.$parent.pollsScope = {};
    $scope.$parent.eventsScope = {};
    $scope.$parent.mentionsScope = {};
    $scope.$parent.Math = window.Math;


    $scope.$parent.posts = [{
      type: "q",
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.",
      timeline: "Just Now",
      pinned: true,
      user: {
        firstname: 'Wood',
        lastname: 'Walton',
        avatar: 'images/random-avatar1.jpg'
      },
      answers: [{
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.",
        user: {
          firstname: 'John',
          lastname: 'Douey',
          avatar: 'images/profile-photo.jpg'
        }
      },{
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.",
        user: {
          firstname: 'John',
          lastname: 'Douey',
          avatar: 'images/profile-photo.jpg'
        }
      }]
    },{
      type: "p",
      body: "Which is the best responsive freamework to start web designing?",
      options: [{
        title: 'Bootstrap Framework',
        votes: 10
      },{
        title: 'Foundation',
        votes: 5
      },{
        title: 'Kune',
        votes: 3
      }],
        timeline: "39 minutes ago",
        user: {
            firstname: 'Mike',
            lastname: 'Stuart',
            avatar: 'images/random-avatar2.jpg'
        }
    },{
      type: "e",
      body: "Meetup next friday at 19:00",
      info: "Good news, everyone! Office hours has a new home at http://learn.nycphyhon.org/. We'll stop posting events to the main NYC phython page after next month. To RSVP for this event, please go here: http://getnear.co/k23124.",
      location: "34 W. 3rd Ave. 4th floor",
      date: "Friday 12 of May",
      time: "19:00",
      price: "free",
        timeline: "2 hours ago",
        user: {
            firstname: 'Robin',
            lastname: 'Wills',
            avatar: 'images/random-avatar3.jpg'
        }
    },{
      type: "@",
      to: 'John Douey',
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.",
        timeline: "2 hours ago",
        user: {
            firstname: 'Imrich',
            lastname: 'Kamarel',
            avatar: 'images/random-avatar4.jpg'
        }
    },{
      type: "@",
      to: 'John Douey',
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.",
        timeline: "2 hours ago",
        user: {
            firstname: 'Imrich',
            lastname: 'Kamarel',
            avatar: 'images/random-avatar4.jpg'
        }
    },{
      type: "@",
      to: 'John Douey',
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.",
        timeline: "2 hours ago",
        user: {
            firstname: 'Imrich',
            lastname: 'Kamarel',
            avatar: 'images/random-avatar4.jpg'
        }
    }];

    $scope.$parent.getPostBody = function(post){
        return post.body;
    }

    $scope.$parent.submitPost = function(){
        function getPostType(post){
            if(post.indexOf('q:') === 0) return 'q';
            if(post.indexOf('@') === 0) return '@';
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
            $scope.newPost = '';
        }
        
        var post_input = $scope.newPost.trim();
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

    $scope.$parent.submitPoll = function(){
    }

    $scope.$parent.submitVote = function(poll){
        if($scope.$parent.pollsScope.selectedPollOption==undefined) return;
        poll.options[$scope.$parent.pollsScope.selectedPollOption].votes ++;
        $scope.$parent.pollsScope.pollTotalVotes ++;
        $scope.$parent.pollsScope.selectedPollOption = null;
    }

    /*  Events     */

    $scope.$parent.newEvent = function(){
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
