function onLoad() {
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

// frameShow/Hide will eventually be deprecated, see the visibility api below
// these event handlers demonstrate that document.visibilityState will contain
// the same value as mozSocial.isVisible
window.addEventListener("socialFrameShow", function(e) {
  dump("socialFrameShow, visibility is "+document.visibilityState+" or "+navigator.mozSocial.isVisible+"\n");
}, false);
window.addEventListener("socialFrameHide", function(e) {
  dump("socialFrameHide, visibility is "+document.visibilityState+" or "+navigator.mozSocial.isVisible+"\n");
}, false);

// via the visibility api
// https://developer.mozilla.org/en-US/docs/DOM/Using_the_Page_Visibility_API
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
