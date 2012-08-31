/* import a helper library */
importScripts("workerScript.js");

// This keeps a list of all the ports that have connected to us
var apiPort;

var RECOMMEND_ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC7ElEQVQ4jW2TS28bZRSGn7l4xnfHTopNLlYToC1JqMQlIHFRRDdISKWLClFVbIBFfwLsu0GVqi5asegCNiyQ2FCkgqIiVC4toYtCEijNDYckbjKO7x57xjOe72OR0lA1Z3n0nkdH57yvwj4lg0BWWi5OIDFCOjEzRNzUlP20jzRn59bEj1ZHGRrLMZo0iZo6dV+wVbDkq/k0I9mU+n+9CiB7rnA2fhNnL38nTl2eIzBUJswG6XQUI2wQT4RZN8J8fWuWO7/MCK/VFP8BdIDe1iqlC8fJ1Cc5OzxJ/qtPKJy5SFqA4guW6y5rTYVkXcMcmGHlm18Jum2hmTF1F9CwMHqbvJ0o4VevUWYUZ/Emtt+hOvIMDUVF74txx08jDY2B7Dzd+u29DYK7V/Cq4CPBDJPKCA6sfcuXFZ0V5RBus0Op1mWhYPNDT/L+sQDJ0i5AdhuyfP51elIB04BonMhglkvJ01xPvURiaYfSYkFWKk20Ro2D412k61Nenb0P8Fz8WgNCBr4Wpni7xNXWu1x5Ooe0a/R8H2E16d7bJOQ7PDFcQqHBcuH+EaXU6bR0BCqi1yMTl7yZ+4uS8yeDTp2JrMNnkTF+qtq8mLSIe0X8cpHD+fTuG7VkvyIyU6K17YhIQhO5pzQxVrnGh1sf8V7lHJ35BUr36girw6mxP+gPVnBX/yYcfWXviKnpkyx+8TmhtIeeHyDcp3JjcZBLGy9zqxEH9wbvHPF5a3ydTnGbwpxCdmJqz4lB1w1ufnCS8s9XOTSdIpaNqkZUZ7OV5B+rzWOxshzP2+jpBJ7dwkq9wdEzM+pDVq6vF4LvT59ALc6Tfy6qJh+PYkYEIc1D+J5UwgI9KRC5F0gf/xQjM6k+sDJAdChP/uOL2EePsbnQYWe+TGejil+zwfOw3R5z1jTbT557MPxImFrtdnB3aQlr9rrK8u+E3R3UWATlQL9k+Ah9h1/j2eenHgrTvhFtu13Zats4jgsSRkeG9tUB/AvjNVepPwFrSQAAAABJRU5ErkJggg==";

function log(msg) {
  dump(new Date().toISOString() + ": [dssworker] " + msg + "\n");
  try {
    console.log(new Date().toISOString() + ": [dssworker] " + msg);
  } catch (e) {}
}

var _broadcastReceivers = [];
function broadcast(topic, payload)
{
  // we need to broadcast to all ports connected to this shared worker
  for (var i = 0; i < _broadcastReceivers.length; i++) {
    //log("about to broadcast to " + _broadcastReceivers[i]);
  _broadcastReceivers[i].postMessage({topic: topic, data: payload});
  }
}

// Called when the worker connects a message port
onconnect = function(e) {
  try {
    var port = e.ports[0];
    port.onmessage = function(e) {
      //log("worker onmessage: " + JSON.stringify(e.data));

      var msg = e.data;
      if (!msg) {
        log("onmessage called with no data")
        return;
      }
      // handle the special message that tells us a port is closing.
      if (msg.topic && msg.topic == "social.port-closing") {
        var index = _broadcastReceivers.indexOf(port);
        if (index != -1) {
          log("removed receiver " + index);
          _broadcastReceivers.splice(index, 1);
        }
        log("bwmworker port closed - now " + _broadcastReceivers.length + " connections.");
        return;
      }

      if (msg.topic && handlers[msg.topic])
        handlers[msg.topic](port, msg);
      else {
        log("message topic not handled: "+msg.topic+" "+JSON.stringify(msg));
        // forward to the api
        try {
          apiPort.postMessage(msg);
        } catch(e) {
          log(e+"\n");
        }
      }
    }


  } catch (e) {
    log(e);
  }
}

var userData = {};
// Messages from the sidebar and chat windows:
var handlers = {
  'social.initialize': function(port, data) {
    log("social.initialize called, capturing apiPort");
    apiPort = port;
  },
  'broadcast.listen': function(port, data) {
    if (data)
      _broadcastReceivers.push(port);
    else {
      var i = _broadcastReceivers.indexOf(port);
      f (i != -1)
        _broadcastReceivers.splice(i, 1);
    }
  },

  'social.user-recommend': function(port, msg) {
    log("demo worker got recommend request for " + msg.data.url);
    // tell our content
    broadcast(msg.topic, msg.data);
  },
  'social.user-unrecommend': function(port, msg) {
    log("demo worker got unrecommend request for " + msg.data.url);
    // tell our content
    broadcast(msg.topic, msg.data);
  },
  'social.user-recommend-prompt': function(port, msg) {
    port.postMessage({topic: 'social.user-recommend-prompt-response',
            data: {
              messages: {
                'shareTooltip': "Recommend this site",
                'unshareTooltip': "Remove recommendation",
                'sharedLabel': "Love It!",
                'unsharedLabel': "Hate It!"
              },
              images: {
                'share': RECOMMEND_ICON,
                'unshare': RECOMMEND_ICON
              }
            }
          });
  },
  'social.cookies-get-response': function(port, msg) {
    let cookies = msg.data;
    let newUserData;
    for (var i=0; i < cookies.length; i++) {
      if (cookies[i].name == "userdata") {
        newUserData = cookies[i].value ? JSON.parse(cookies[i].value) : {};
        break;
      }
    }
    if (userData.userName != newUserData.userName) {
      userData = newUserData;
      port.postMessage({topic: "social.user-profile", data: userData});
      broadcast('social.user-profile', userData);
      if (userData.userName)
        port.postMessage({topic: 'social.ambient-notification',
              data: {
                name: "test",
                iconURL: RECOMMEND_ICON,
                counter: "10",
                contentPanel: location.protocol + "//" + location.host + "/statusPanel.html"
              }});
    }
  }
}

// lets watch for cookie updates here, polling kinda sucks
function checkCookies() {
  apiPort.postMessage({topic: 'social.cookies-get'});  
}
setInterval(checkCookies, 1000);
