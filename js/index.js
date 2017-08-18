function search(query) {
  if (!query) {
    console.log("doing nothing");
    return;
  }
  var baseUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&limit=10&namespace=0&format=json&search=";
  var formData = $("#search-form").serializeArray();
  var queryStr = encodeURIComponent(query);

  var queryPromise = Promise.resolve($.ajax({
    url: baseUrl + queryStr + "&callback=?",
    dataType: "json",
    headers: {
      "Api-User-Agent": "Wikiviewer"
    }
  }));

  queryPromise.then((json) => {
    console.log("request successful");
    update(json);
  }, (xhr) => {
    console.log("bam!");
  });
}

function update(json) {
  var query = json[0];
  var titles = json[1];
  var desc = json[2];
  var links = json[3];
  console.log(titles);
  $(".search-text").attr("value", query);

  for (let i = 0; i < titles.length; i++) {
    $(".main #search-list").append('<li><a href="' + links[i] + '">' + titles[i] + "</a></li>");
  }
}

$(document).ready(function() {
  var searchParams = new URLSearchParams($(location).attr("search"));
  var query = searchParams.get("q");
  search(query);
});