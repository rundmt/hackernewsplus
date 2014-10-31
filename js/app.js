var app = angular.module("HackerNewsPlus", ["firebase"]);

app.controller("HackerNewsCtrl", function($scope, $firebase) {
  $scope.newsLinks = [];
  var ref = new Firebase("https://hacker-news.firebaseio.com/v0/topstories");
  var sync = $firebase(ref);

  // download the data into a local object
  var syncArray = sync.$asArray();

  syncArray.$loaded().then(function(data){
  	for (var i = 0; i < 6; i++) {
  		var currentLink = data[i].$value
  		
  		
  		var linkRef = new Firebase(" https://hacker-news.firebaseio.com/v0/item/" + currentLink);
  		var linkSync = $firebase(linkRef);
  		var linkObj = linkSync.$asObject();

  		linkObj.$loaded().then(function(data){
  			$scope.newsLinks.push(data.url);
  		})
  		// console.log(linkObj);
  		// console.log(data[i].$value);
  	};
  	embedCard();
  });

  function embedCard(){
  	(function(w, d){
	   var id='embedly-platform', n = 'script';
	   if (!d.getElementById(id)){
	     w.embedly = w.embedly || function() {(w.embedly.q = w.embedly.q || []).push(arguments);};
	     var e = d.createElement(n); e.id = id; e.async=1;
	     e.src = ('https:' === document.location.protocol ? 'https' : 'http') + '://cdn.embedly.com/widgets/platform.js';
	     var s = d.getElementsByTagName(n)[0];
	     s.parentNode.insertBefore(e, s);
	   }
	  })(window, document);

  }
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  // syncArray.$bindTo($scope, "data");
});