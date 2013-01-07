
function onLoad() {
  $("#shared").text(location.hash);
}
function share() {
}

addEventListener("OpenGraphData", function(e) {
  dump("******** got OpenGraphData event! "+e.detail+"\n");
  var data = JSON.parse(e.detail);
  $("#shared").text(data.url);
  $("#data").text(e.detail);
})
