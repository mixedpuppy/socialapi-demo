/* import a helper library */
log("************** worker.js is executing ****************\n");

// just a demo icon that we user for our toolbar button and our
// recommend button.
var RECOMMEND_ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC7ElEQVQ4jW2TS28bZRSGn7l4xnfHTopNLlYToC1JqMQlIHFRRDdISKWLClFVbIBFfwLsu0GVqi5asegCNiyQ2FCkgqIiVC4toYtCEijNDYckbjKO7x57xjOe72OR0lA1Z3n0nkdH57yvwj4lg0BWWi5OIDFCOjEzRNzUlP20jzRn59bEj1ZHGRrLMZo0iZo6dV+wVbDkq/k0I9mU+n+9CiB7rnA2fhNnL38nTl2eIzBUJswG6XQUI2wQT4RZN8J8fWuWO7/MCK/VFP8BdIDe1iqlC8fJ1Cc5OzxJ/qtPKJy5SFqA4guW6y5rTYVkXcMcmGHlm18Jum2hmTF1F9CwMHqbvJ0o4VevUWYUZ/Emtt+hOvIMDUVF74txx08jDY2B7Dzd+u29DYK7V/Cq4CPBDJPKCA6sfcuXFZ0V5RBus0Op1mWhYPNDT/L+sQDJ0i5AdhuyfP51elIB04BonMhglkvJ01xPvURiaYfSYkFWKk20Ro2D412k61Nenb0P8Fz8WgNCBr4Wpni7xNXWu1x5Ooe0a/R8H2E16d7bJOQ7PDFcQqHBcuH+EaXU6bR0BCqi1yMTl7yZ+4uS8yeDTp2JrMNnkTF+qtq8mLSIe0X8cpHD+fTuG7VkvyIyU6K17YhIQhO5pzQxVrnGh1sf8V7lHJ35BUr36girw6mxP+gPVnBX/yYcfWXviKnpkyx+8TmhtIeeHyDcp3JjcZBLGy9zqxEH9wbvHPF5a3ydTnGbwpxCdmJqz4lB1w1ufnCS8s9XOTSdIpaNqkZUZ7OV5B+rzWOxshzP2+jpBJ7dwkq9wdEzM+pDVq6vF4LvT59ALc6Tfy6qJh+PYkYEIc1D+J5UwgI9KRC5F0gf/xQjM6k+sDJAdChP/uOL2EePsbnQYWe+TGejil+zwfOw3R5z1jTbT557MPxImFrtdnB3aQlr9rrK8u+E3R3UWATlQL9k+Ah9h1/j2eenHgrTvhFtu13Zats4jgsSRkeG9tUB/AvjNVepPwFrSQAAAABJRU5ErkJggg==";

var loc = location.href;
var baseurl = loc.substring(0,loc.lastIndexOf('/'));
importScripts("manifest.js");
var manifest= getManifest();

function log(msg) {
    dump("[[[[" + new Date().toISOString() + ": [dssworker] " + msg + "\n");
  try {
    console.log(new Date().toISOString() + ": [dssworker] " + msg);
  } catch (e) {
    
  }
}

// The social.initialize message is sent from Firefox as a part of startup for
// the worker. We keep track of the port so we can communicate back to Firefox
// for any of our api calls. All other ports come from our content. For this
// demo, we keep track of all our ports in the _broadcastReceivers list. We can
// then broadcast messages to all of our content.
var apiPort;
var _broadcastReceivers = [];
function broadcast(topic, payload)
{
  // we need to broadcast to all ports connected to this markd worker
  ports = [].concat(_broadcastReceivers);
  for (var i = 0; i < ports.length; i++) {
    //log("about to broadcast to " + _broadcastReceivers[i]);
    try {
      ports[i].postMessage({topic: topic, data: payload});
    } catch(e) {
      _broadcastReceivers.splice(i, 1);
    }
  }
}

ononline = function() {
  log("!!!!!!! ononline called "+navigator.onLine+"\n");
}
onoffline = function() {
  log("!!!!!!! onoffline called "+navigator.onLine+"\n");
}
onunload = function() {
  log("!!!!!!! onunload called\n");
}
// Called when any port connects to the worker
onconnect = function(e) {
  try {
    var port = e.ports[0];

    // this is our basic message handler
    port.onmessage = function(e) {
      //log("worker onmessage: " + JSON.stringify(e.data));

      var msg = e.data;
      if (!msg) {
        log("onmessage called with no data")
        return;
      }
      // handle the special message that tells us a port is closing.
      if (msg.topic && msg.topic == "social.port-closing") {
        if (port == apiPort) {
          log("!!!!!!!!!!!!! apiPort has closed!\n");
        }
        var index = _broadcastReceivers.indexOf(port);
        if (index != -1) {
          log("removed receiver " + index);
          _broadcastReceivers.splice(index, 1);
        }
        //log("bwmworker port closed - now " + _broadcastReceivers.length + " connections.");
        return;
      }

      if (msg.topic && handlers[msg.topic])
        handlers[msg.topic](port, msg);
      else {
        log("message topic not handled: "+msg.topic+" "+JSON.stringify(msg));
        // this is just a simple way for content to get a call passed through
        // to the worker api in Firefox for our testing.
        try {
          apiPort.postMessage(msg);
        } catch(e) {
          log(e+"\n");
        }
      }
    }

    // worker.connected is our own message, it is not part of any api.  We
    // use it as a way to signal content that we are connected to them.  This
    // is useful if we reload the worker (see social.reload-worker)
    port.postMessage({topic: "worker.connected"});

    // upon loading of the worker we want to send the user profile, if any.
    // an empty profile tells Firefox and other content (if necessary) that
    // the user is not currently logged in.
    port.postMessage({topic: "social.user-profile", data: userData});
  } catch (e) {
    log(e);
  }
}

var userData = {};

// We have no way to see cookies in the worker, so we have to ask Firefox
// to tell us what the cookies are for our domain.  As well, since we are
// relying on cookies as part of our demo login functionality, we need to
// poll the cookies for changes. We start that polling during social.initialize
function checkCookies() {
  apiPort.postMessage({topic: 'social.cookies-get'});
}

// Messages from the sidebar and chat windows:
var handlers = {
  'ping': function(port, msg) {
    port.postMessage({topic: 'pong'});
  },
  
  'worker.update': function(port, msg) {
    log("***** worker setting manifest "+JSON.stringify(manifest)+"\n");
    apiPort.postMessage({topic: 'social.manifest-get'});
  },
  'social.manifest': function(port, msg) {
    log("***** worker recieved manifest from fx "+JSON.stringify(manifest)+"\n");
    // we could check to see if we need to update, this test just updates
    apiPort.postMessage({topic: 'social.manifest-set', data: manifest});
  },

  // worker.reload is our own message and is not defined by socialapi.  Our
  // test sidebar can send this, letting us know to force a reload of
  // this worker script.
  'worker.reload': function(port, msg) {
    clearInterval(checkCookies);
    broadcast(msg.topic, msg.data);
    // first, lets update our manifest if necessary.
    apiPort.postMessage({topic: 'social.reload-worker'});
  },

  // This is the first call we should receive from Firefox.  We track that
  // port as teh apiPort, and start our polling of the cookies for login/logout
  // tracking
  'social.initialize': function(port, data) {
    log("social.initialize called, capturing apiPort");
    apiPort = port;
    setInterval(checkCookies, 1000);
    
    // send pagemark
    // Firefox 23 or 24 changes the arguments used
    // bug 853151
    var loc = location.href;
    var baseurl = loc.substring(0,loc.lastIndexOf('/'));
    port.postMessage({topic: 'social.page-mark-config',
            data: {
              messages: {
                'unmarkedTooltip': "Tell me hearty thar be booty here",
                'markedTooltip': "Don't tell nay one",
                'unmarkedLabel': "Mark",
                'markedLabel': "Unmark",
              },
              images: {
                'marked': baseurl+"/checked.jpg",
                'unmarked': baseurl+"/unchecked.jpg"
              }
            }
          });
  },
  
  // our content (sidebar, etc) can request broadcast messages.
  'broadcast.listen': function(port, data) {
    if (data)
      _broadcastReceivers.push(port);
    else {
      var i = _broadcastReceivers.indexOf(port);
      f (i != -1)
        _broadcastReceivers.splice(i, 1);
    }
  },

  // Requires Firefox 23
  'social.page-mark': function(port, msg) {
    log("demo worker got page-mark request for " + msg.data.url);
    broadcast(msg.topic, msg.data);
  },

  // Deprecated as of Firefox 23
  // Sent by firefox to the worker. The user has clicked on the recommend button
  // in the urlbar
  'social.user-recommend': function(port, msg) {
    log("demo worker got recommend request for " + msg.data.url);
    // tell our content
    broadcast(msg.topic, msg.data);
  },

  // Deprecated as of Firefox 23
  // Sent by firefox to the worker. the user has clicked on the recommend button
  // in the urlbar a second time, resulting in a request to unrecommend the url.
  'social.user-unrecommend': function(port, msg) {
    log("demo worker got unrecommend request for " + msg.data.url);
    // tell our content
    broadcast(msg.topic, msg.data);
  },

  // Sent by firefox to the worker.  Firefox needs some configuration data to
  // enable the recommend button in the urlbar.  If we do not support the
  // recommend button, we do not have to respond to this.
  // up to firefox 22
  'social.user-recommend-prompt': function(port, msg) {
    port.postMessage({topic: 'social.user-recommend-prompt-response',
            data: {
              messages: {
                'shareTooltip': "Tell me hearty thar be booty here",
                'unshareTooltip': "Don't tell nay one",
                'sharedLabel': "Love It!",
                'unsharedLabel': "Hate It!",
                "unshareLabel": "Shiver me timbers!",
                "portraitLabel": "Me Matey",
                "unshareConfirmLabel": "Aye!",
                "unshareConfirmAccessKey": "A",
                "unshareCancelLabel": "Avast!",
                "unshareCancelAccessKey": "a",
              },
              images: {
                'share': RECOMMEND_ICON,
                'unshare': RECOMMEND_ICON,
              }
            }
          });
  },

  // Sent by Firefox as a response to our checkCookies call above.  We parse
  // the response and set our userData from the cookie. If the cookie contains
  // any data, we send back the user-profile message so Firefox can display user
  // profile information.  We must send a valid user-profile before we can
  // setup any notification icons in our toolbar button.
  'social.cookies-get-response': function(port, msg) {
    try {
    let cookies = msg.data;
    let newUserData = {};
    for (var i=0; i < cookies.length; i++) {
      if (cookies[i].name == "userdata") {
        newUserData = cookies[i].value ? JSON.parse(cookies[i].value) : {};
        break;
      }
    }
    if (userData.userName != newUserData.userName) {
      var end = location.href.indexOf("worker.js");
      var baselocation = location.href.substr(0, end);
      userData = newUserData;
      port.postMessage({topic: "social.user-profile", data: userData});
      broadcast('social.user-profile', userData);
      if (userData.userName)
        port.postMessage({topic: 'social.ambient-notification',
              data: {
                name: "panel1",
                iconURL: RECOMMEND_ICON,
                counter: "2",
                contentPanel: baselocation + "/statusPanel.html",
                label: "Test Ambient 1",
                // normally this would be a url to a web page that works in
                // a normal browser tab, we're just reusing this panel for
                // testing
                menuURL: baselocation + "/statusPanel.html"
              }});
        port.postMessage({topic: 'social.ambient-notification',
              data: {
                name: "panel2",
                iconURL: RECOMMEND_ICON,
                counter: "",
                contentPanel: baselocation + "/statusPanel.html",
                label: "Test Ambient 2",
                // normally this would be a url to a web page that works in
                // a normal browser tab, we're just reusing this panel for
                // testing
                menuURL: baselocation + "/statusPanel.html"
              }});
    }
    } catch(e) {
      log(e.stack+"\n");
    }
  }
}
