var app = angular.module("HackerNewsPlus", ["firebase", "ngEmbedApp"]);

app.directive('myEmbedlyTest', function() {
  return {
    controller: function ($scope, $rootScope) {
      $scope.key = '3a5f30cee32b4fdc9a65314ae4af5641';
      $scope.query = {
                        maxwidth: 500,
                        chars: 300,
                        autoplay: false
                      };
    }
  }
});

app.controller("HackerNewsCtrl",  function($scope, $firebase) {
  $scope.newsLinks = [];
  // $scope.key = '3a5f30cee32b4fdc9a65314ae4af5641';
  // $scope.query = {maxwidth:200};

  var ref = new Firebase("https://hacker-news.firebaseio.com/v0/topstories");
  var sync = $firebase(ref);

  // download the data into a local object
  var syncArray = sync.$asArray();

  syncArray.$loaded().then(function(data){
  	for (var i = 0; i < 30; i++) {
  		var currentLink = data[i].$value


  		var linkRef = new Firebase(" https://hacker-news.firebaseio.com/v0/item/" + currentLink);
  		var linkSync = $firebase(linkRef);
  		var linkObj = linkSync.$asObject();

  		linkObj.$loaded().then(function(data){
  			$scope.newsLinks.push(data);
  		})
  	};

  });

  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  // syncArray.$bindTo($scope, "data");
});

// app.config(function(embedlyServiceProvider){
//     embedlyServiceProvider.setKey('3a5f30cee32b4fdc9a65314ae4af5641');
// });
