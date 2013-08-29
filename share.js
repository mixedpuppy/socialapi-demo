
function onLoad() {
  $("#shared").text(location.search);
}
function share() {
  var worker = navigator.mozSocial.getWorker();
  if (!shareData)
    return;
  worker.port.postMessage({topic: 'social.user-recommend', data: shareData});
  window.close();
}
function unmark() {
  var event = new CustomEvent("socialMarkUpdate", {"detail": false});
}

var shareData;
addEventListener("OpenGraphData", function(e) {
  dump("******** got OpenGraphData event! "+e.detail+"\n");
  shareData = JSON.parse(e.detail);
  $("#shared").text(shareData.url);
  $("#data").text(e.detail);
})
