(function () {

  var app = angular.module("wikiViewer", []);

  var baseUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&limit=10&namespace=0&format=json&search=";
  var queryStr = encodeURIComponent("Karma");

  app.controller("ViewController", ["$http", "$sce", function($http, $sce) {
    var view = this;
    view.raw = [];

    var url = baseUrl + queryStr;
    url = $sce.trustAsResourceUrl(url);
    console.log(url);
    
    $http.jsonp(url, { headers: {"Api-User-Agent": "Wikiviewer"}, jsonCallbackParam: 'callback' }).then(function(data){
      view.raw = data;
    }, function(err) {
      console.log("bam!" + err);
    });

  }]);

})();