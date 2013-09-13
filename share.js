
function onLoad() {
  $("#shared").text(location.search);
}
function share() {
  try {
    var worker = navigator.mozSocial.getWorker();
    if (shareData)
      worker.port.postMessage({topic: 'social.user-recommend', data: shareData});
  } catch(e) {}
  window.close();
}
function unmark() {
  var event = new CustomEvent("socialMarkUpdate", {"detail": false});
}

var shareData;
addEventListener("OpenGraphData", function(e) {
  shareData = JSON.parse(e.detail);
  $("#shared").text(shareData.url);
  $("#data").text(e.detail);
})
