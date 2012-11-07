function onLoad() {
  // visual verification that we do indeed get a worker port
  var worker = navigator.mozSocial.getWorker();
  var el = document.getElementById("content");
  if (worker) {
    el.style.borderColor = "green";
  } else {
    el.style.borderColor = "red";
  }
}

// dumping these events for test reasons
window.addEventListener("DOMWindowClose", function(e) {
  dump("DOMWindowClose in panel...\n");
}, false);
window.addEventListener("close", function(e) {
  dump("onclose in panel...\n");
}, false);
window.addEventListener("scroll", function(e) {
  dump("scrolling flyout...\n");
}, false);

window.addEventListener("socialFrameShow", function(e) {
  dump("socialFrameShow, visibility is "+document.visibilityState+" or "+navigator.mozSocial.isVisible+"\n");
}, false);
window.addEventListener("socialFrameHide", function(e) {
  dump("socialFrameHide, visibility is "+document.visibilityState+" or "+navigator.mozSocial.isVisible+"\n");
}, false);

function changeSize() {
  var el = document.getElementById('list');
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
  var count = Math.floor( Math.random() * 20 );
  for( var i=0; i < count; ++i ) {
    var ap  = document.createElement("li");
    ap.innerHTML = "Item <span>__</span> <i>#</i> <b>" + i + "</b>";
    el.appendChild( ap );
  }
}
