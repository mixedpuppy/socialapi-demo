// Listen for messages from clients.
self.addEventListener('message', function(event) {
  // Get all the connected clients and forward the message along.
  console.log("***** got message "+event.source);
  console.log("***** got message "+JSON.stringify(event.data));
  var msg = event.data;
  if (msg.topic && handlers[msg.topic]) {
    handlers[msg.topic](event.source, msg);
    return;
  }
});

function broadcast(topic, data) {
  var promise = self.clients.matchAll()
  .then(function(clientList) {
    console.log("send message to each client in ");
    clientList.forEach(function(client) {
      console.log("send to "+client.id);
      client.postMessage({topic: topic, data: data});
    });
  });
}

// Immediately claim any new clients. This is not needed to send messages, but
// makes for a better demo experience since the user does not need to refresh.
// A more complete example of this given in the immediate-claim recipe.
self.addEventListener('activate', function(event) {
  console.log("SW: received activate event");
  dump("***** SW activate\n");
  event.waitUntil(self.clients.claim());
});

// Messages from the sidebar and chat windows:
var handlers = {
  'ping': function(port, msg) {
    port.postMessage({topic: 'pong'});
  },

  'worker.update': function(port, msg) {
    //log("***** worker getting current manifest "+JSON.stringify(manifest)+"\n");
    this.updating = true;
    apiPort.postMessage({topic: 'social.manifest-get'});
  },
  'social.manifest': function(port, msg) {
    //log("***** worker recieved manifest from fx "+JSON.stringify(msg.data)+", updating? "+this.updating+"\n");
    // we could check to see if we need to update, this test just updates
    if (this.updating) {
        this.updating = false;
        msg.data.version++;
        apiPort.postMessage({topic: 'social.manifest-set', data: msg.data});
    } else {
        broadcast(msg.topic, msg.data);
    }
  },

  // worker.reload is our own message and is not defined by socialapi.  Our
  // test sidebar can send this, letting us know to force a reload of
  // this worker script.
  'worker.reload': function(source, msg) {
    broadcast(msg.topic, msg.data);
    self.update(); // XXX not supported
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

  // Sent by Firefox as a response to our checkCookies call above.  We parse
  // the response and set our userData from the cookie. If the cookie contains
  // any data, we send back the user-profile message so Firefox can display user
  // profile information.  We must send a valid user-profile before we can
  // setup any notification icons in our toolbar button.
  'social.cookies-get-response': function(port, msg) {
    try {
    var cookies = msg.data;
    var newUserData = {};
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
    }
    } catch(e) {
      log(e.stack+"\n");
    }
  }
}
