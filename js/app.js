(function () {
  var app = angular.module("wikiViewer", ["search"]);
  
  app.controller("ViewController", function() {
    this.results = {"data":[], "query":""};
  });

  app.directive("articleList", function() {
    return {
      restrict: "E",
      templateUrl: "directives/article-list.html"
    };
  });
})();