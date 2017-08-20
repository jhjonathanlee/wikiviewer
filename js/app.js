(function () {
  var app = angular.module("wikiViewer", []);
  var baseUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&limit=20&namespace=0&format=json&search=";

  app.controller("ViewController", function() {
    this.results = {"data":[], "query":""};
  });

  app.controller("QueryController", ["$http", "$sce", function($http, $sce) {
    this.query = "";
    this.search = function(query, results) {
      console.log("searching: " + encodeURIComponent(query));
      var url = baseUrl + query;
      console.log("url: " + url);
      url = $sce.trustAsResourceUrl(url);
      
      $http.jsonp(url, { headers: {"Api-User-Agent": "Wikiviewer"}, jsonCallbackParam: 'callback' }).then(function(json){
        console.log("orig results: " + results)
        console.log("data: " + JSON.stringify(json.data[0]));
        let data = json.data;
        results.data = [];
        results.query = data[0];

        let titles = data[1];
        let descs = data[2];
        let links = data[3];

        for (let i = 0; i < titles.length; i++) {
          results.data.push({"title": titles[i], "desc": descs[i], "link": links[i]});
        }

        console.log(results);

      }, function(err) {
        console.log("bam!" + err);
      }); 
    };
  }]);

  app.directive("articleList", function() {
    return {
      restrict: "E",
      templateUrl: "directives/article-list.html"
    };
  });
})();