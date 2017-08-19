(function () {
  var app = angular.module("wikiViewer", []);
  var baseUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&limit=10&namespace=0&format=json&search=";

  app.controller("ViewController", function() {
    this.results = {"data":"default"};
  });

  app.controller("QueryController", ["$http", "$sce", function($http, $sce) {
    this.query = "";
    this.search = function(query, results) {
      console.log("searching: " + encodeURIComponent(query));
      var url = baseUrl + query;
      console.log("url: " + url);
      url = $sce.trustAsResourceUrl(url);
      
      $http.jsonp(url, { headers: {"Api-User-Agent": "Wikiviewer"}, jsonCallbackParam: 'callback' }).then(function(data){
        console.log("orig results: " + results.test)
        results.data = data;
        console.log(results);
      }, function(err) {
        console.log("bam!" + err);
      }); 
    };
  }]);
})();