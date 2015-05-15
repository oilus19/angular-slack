'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:GroupListCtrl
 * @description
 * # GroupListCtrl
 * Controller of the getnearApp
 */
angular.module('getnearApp')
    .controller('GroupListCtrl', function ($scope, $timeout, $modal, $state) {

        $scope.setLayout = function() {
            $('body').removeClass('rightbar-show').addClass('rightbar-hidden').addClass('rightbar-disabled');
            $('#content').css('left','0');
        }

        $scope.joinGroup = function(group) {
            $scope.$parent.joinedGroup.push(group);
            $state.go("group.channel",{group: group.title, channel: 'General'});
        }

        $scope.$parent.groupStatus = [{
            title: "Public",
            slug: "public"
        },{
            title: "Private",
            slug: "private"
        }];

        $scope.$parent.groupCategories = [{
            title: "Web Development",
            slug: "web_development"
        },{
            title: "Mobile Development",
            slug: "mobile_development"
        }];

        $scope.$parent.groups = [];

        for(var i=1; i<=12; i++){
            $scope.$parent.groups.push({
                title: "Python Developers"+i.toString(),
                slug: "python_developers"+i.toString(),
                category: "Web Development",
                initial: i.toString(),
                status: "Public",
                description: "",
                icon: "fa-users",
                membercount: 2012,
                channelcount: 12
            });
        }

        $scope.$parent.filter = {};
  });

