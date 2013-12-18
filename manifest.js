var loc = location.href;
var baseurl = loc.substring(0,loc.lastIndexOf('/'));

function getManifest() {
  return {
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
}
