'use strict'

angular.module('app', ['ngRoute', 'ngResource', 'codinghitchhiker.mosaic'])
.factory('Categories', ['$resource', function($resource) {
    return $resource('/categories/:id', null, {
        'update': { method: 'PUT' }
    });
}])
.controller('CategoryController', ['$scope', 'Categories', function ($scope, Categories) {
    $scope.categories = Categories.query();

    $scope.addCategory = function() {
        if(!$scope.newCategory || $scope.newCategory.length < 1) return;
        var category = new Categories({ name: $scope.newCategory, bookmarks: []});

        category.$save(function() {
            $scope.categories.push(category);
            $scope.newCategory = '';
        });
    }

    $scope.removeCategory = function(index) {
        var category = $scope.categories[index];
        Categories.remove({id: category._id}, function() {
            $scope.categories.splice(index, 1);
        });
    }

    $scope.addBookmarkTo = function(categoryIndex, newBookmark) {
        if (newBookmark.name.length < 1 || newBookmark.url.length < 1) return;

        var category = $scope.categories[categoryIndex];

        category.bookmarks.push(angular.copy(newBookmark));
        Categories.update({id: category._id}, category, function() {
            newBookmark.name = '';
            newBookmark.url = '';
        });
    }

    $scope.removeBookmarkFrom = function(categoryIndex, bookmarkIndex) {
        var category = $scope.categories[categoryIndex];
        category.bookmarks.splice(bookmarkIndex, 1);
        Categories.update({id: category._id}, category);
    }
}]);
