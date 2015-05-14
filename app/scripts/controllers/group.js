'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:GroupCtrl
 * @description
 * # GroupCtrl
 * Controller of the getnearApp
 */
angular.module('getnearApp')
    .controller('GroupCtrl', function ($scope, $timeout, $modal) {

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

        for(var i=0; i<10; i++){
            $scope.$parent.groups.push({
                title: "Python Developers",
                slug: "python_developers",
                category: "Web Development",
                status: "Public",
                description: "",
                icon: "fa-users",
                membercount: 2012,
                channelcount: 12
            });
        }

        $scope.$parent.filter = {};
  });

