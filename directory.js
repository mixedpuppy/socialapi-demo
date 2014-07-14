var loc = location.href;
var baseurl = loc.substring(0,loc.lastIndexOf('/'));

var manifests = {
  "demoTest": {
    "origin": baseurl,
    // currently required
    "name": "Demo Social Service",
    // icons from http://findicons.com/icon/158311/firefox?id=356182 by ipapun
    "iconURL": baseurl+"/firefox16.png",
    "icon32URL": baseurl+"/firefox32.png",
    "icon64URL": baseurl+"/firefox64.png",
  
    // at least one of these must be defined
    "workerURL": baseurl+"/worker.js",
    "sidebarURL": baseurl+"/sidebar.htm",
    "statusURL": baseurl+"/statusPanel.html",
    "shareURL": baseurl+"/share.html?url=%{url}",
    
    "markURL": baseurl+"/mark.html?url=%{url}",
    "markedIcon": baseurl+"/checked32.png",
    "unmarkedIcon": baseurl+"/unchecked32.png",
  
    // should be available for display purposes
    "description": "A short paragraph about this provider",
    "author": "Shane Caraveo, Mozilla",
    "homepageURL": "https://github.com/mixedpuppy/socialapi-demo/",
  
    // optional
    "version": 1
  }
  //"hardblock": {
  //  "name": "HardBlock test provider",
  //  "iconURL": "https://webrtc-demo.vcap.mozillalabs.com/icon.png",
  //  "workerURL": "https://test-service-1/worker.js",
  //  "sidebarURL": "https://test-service-1/sidebar.htm",
  //  "origin": "https://test-service-1"
  //},
  //"softblock": {
  //  "name": "SoftBlock test provider",
  //  "iconURL": "https://webrtc-demo.vcap.mozillalabs.com/icon.png",
  //  "workerURL": "https://test-service-2/worker.js",
  //  "sidebarURL": "https://test-service-2/sidebar.htm",
  //  "origin": "https://test-service-2"
  //}
};

function activateProvider(node, name) {
  var event = new CustomEvent("ActivateSocialFeature");
  node.setAttribute("data-service", JSON.stringify(manifests[name]));
  node.dispatchEvent(event);
}

function generate(parent) {
  var list = document.createElement("div");
  for (var key in manifests) {
    var btn = document.createElement("button");
    var m = manifests[key];
    btn.setAttribute("onclick", "activateProvider(this, '" + key + "')");
    btn.style.margin = "5px";
    btn.style.padding = "5px";
    btn.style.background = "url('"+m.iconURL+"') left center no-repeat";
    btn.style.paddingLeft = "20px";
    btn.setAttribute("title", "Activate " + m.name);
    btn.appendChild(document.createTextNode("Activate " + m.name));
    list.appendChild(btn);
  }
  parent.appendChild(list);
}