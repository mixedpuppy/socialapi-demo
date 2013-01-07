function onLoad() {
  // visual verification that we do indeed get a worker port
  var worker = navigator.mozSocial.getWorker();
  var el = document.getElementById("content");
  if (worker) {
    el.style.borderColor = "green";
  } else {
    el.style.borderColor = "red";
  }

  onhashchange();  
}

onhashchange = function() {
  var text = document.createTextNode(location.hash);
  var hash = document.getElementById("openValue");
  if (hash.firstChild) hash.removeChild(hash.firstChild);
  hash.appendChild(text);
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
window.addEventListener("focus", function(e) {
  dump("panel focus...\n");
}, false);
window.addEventListener("blur", function(e) {
  dump("panel blur...\n");
}, false);

window.addEventListener("socialFrameShow", function(e) {
  dump("socialFrameShow, visibility is "+document.visibilityState+" or "+navigator.mozSocial.isVisible+"\n");
}, false);
window.addEventListener("socialFrameHide", function(e) {
  dump("socialFrameHide, visibility is "+document.visibilityState+" or "+navigator.mozSocial.isVisible+"\n");
}, false);

// via the visibility api
function onVisibilityChange() {
  dump("onVisibilityChange, document hidden?"+document.hidden+"\n");
}
document.addEventListener("load", function() {
  onVisibilityChange();
});
document.addEventListener("visibilitychange", function() {
  onVisibilityChange()
});

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
