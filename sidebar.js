var chatters = 0;
var baselocation = location.href.substr(0, location.href.indexOf("sidebar.htm"));

var bSW = ('serviceWorker' in navigator);

navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function(reg) {

  if(reg.installing) {
    console.log('Service worker installing');
  } else if(reg.waiting) {
    console.log('Service worker installed');
  } else if(reg.active) {
    console.log('Service worker active');
  }

}).catch(function(error) {
  // registration failed
  console.log('Registration failed with ' + error);
});

function onLoad() {
  //dump("sidebar onload called\n");
  $("#domain").text(location.host);
  var data = document.cookie.split("=",2)[1];
  userIsConnected(JSON.parse(data));
  //
  //if (bSW) {
  //  navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function(reg) {
  //
  //    if(reg.installing) {
  //      console.log('Service worker installing');
  //    } else if(reg.waiting) {
  //      console.log('Service worker installed');
  //    } else if(reg.active) {
  //      console.log('Service worker active');
  //    }
  //
  //  }).catch(function(error) {
  //    // registration failed
  //    console.log('Registration failed with ' + error);
  //  });
  //} else {
  //  var worker = navigator.mozSocial.getWorker();
  //  $("body").css("background-color", worker? "green": "red")
  //  setTimeout(function() {
  //    worker.port.postMessage({topic: 'social.manifest-get'});
  //  }, 0);
  //}
}
window.onunload = function() {
  //dump("sidebar unLoad called\n");
}

// via the visibility api
// https://developer.mozilla.org/en-US/docs/DOM/Using_the_Page_Visibility_API
function onVisibilityChange() {
  dump("onVisibilityChange, document hidden?"+document.hidden+"\n");
}
window.addEventListener("load", function() {
  onVisibilityChange();
});
document.addEventListener("visibilitychange", function() {
  onVisibilityChange()
});

function testPermissionPrompt() {
  navigator.geolocation.getCurrentPosition(function(position) {
    dump("geo: "+position.coords.latitude+":"+position.coords.longitude+"\n");
  });

  // testing offline storage permission
  var request = indexedDB.open("workerdb", 1);
  request.onsuccess = function(event) {
    dump("******* indexedDB opened\n");
    var db = request.result;
    db.close();
  };

  //navigator.mozGetUserMedia({video: true, audio: true}, function(stream) {
  //  
  //}, function(err) {
  //});  
}

var users = [
  {
    portrait: baselocation + "/user.png",
    userName: "matey",
    dispayName: "Bucko Matey",
    profileURL: baselocation + "/user.html",
    iconURL: baselocation + "/firefox16.png"
  },
  {
    portrait: baselocation + "/user2.png",
    userName: "Hidee Ho!",
    dispayName: "Hidee Ho!",
    profileURL: baselocation + "/user.html",
    iconURL: baselocation + "/icon.png"
  }
];
var userdata = users[0];

// a fake login function that sets a cookie.  Our worker is polling for
// cookie changes and will update the user-profile based on this.
function signin() {
  document.cookie="userdata="+JSON.stringify(userdata);
}

function changeusers() {
  if (userdata == users[0])
    userdata = users[1];
  else
    userdata = users[0];
  //dump(document.cookie+"\n");
  document.cookie="userdata=";
  document.cookie="userdata="+JSON.stringify(userdata);
  //dump(document.cookie+"\n");
}

function signout() {
  // send an empty user object to signal a signout to firefox.  our worker
  // is polling for cookies and will do the real work.
  document.cookie="userdata=";
}

// open a flyout panel using a data url.  This is a good way to avoid network
// traffic if the amount of data can be minimized.
function openDataPanel(event) {
  // currently cant do this
  var url = "data:text/html,%3Chtml%3E%3Cbody%3E%3Cp%3EInline%20data%3C%2Fp%3E%3C%2Fbody%3E%3C%2Fhtml%3E";
  navigator.mozSocial.openPanel(url, event.clientY, function(win) {
	dump("window is opened "+win+"\n");
  });
}

function userIsConnected(userdata)
{
  $("#userid").text(userdata.userName);
  $("#usericon").attr("src", userdata.portrait);
  $("#useridbox").show();
  $("#usericonbox").show();
  $("#signin").hide();
  $("#content").show();
}

function userIsDisconnected()
{
  $("#signin").show();
  $("#content").hide();
  $("#userid").text("");
  $("#usericon").attr("src", "");
  $("#useridbox").hide();
  $("#usericonbox").hide();
}

messageHandlers = {
  "worker.connected": function(data) {
    // our port has connected with the worker, do some initialization
    // worker.connected is our own custom message
    var port = navigator.serviceWorker.controller;
    port.postMessage({topic: "broadcast.listen", data: true});
  },
  "social.user-profile": function(data) {
    if (data.userName)
      userIsConnected(data);
    else
      userIsDisconnected();
  },
  'social.page-mark': function(data) {
    $("#shared").text(data.marked ? data.url : "");
  },
  'social.user-recommend': function(data) {
    $("#shared").text(data.url);
  },
  'social.user-unrecommend': function(data) {
    $("#shared").text("");
  },
  'social.manifest': function(data) {
    $("#version").text("version: "+data.version);
  }
};

navigator.serviceWorker.addEventListener('message', function(event) {
  dump("serviceWorker data "+JSON.stringify(event.data)+"\n");
  var topic = event.data.topic;
  var data = event.data.data;
  if (messageHandlers[topic])
      messageHandlers[topic](data);
});

// here we ask the worker to reload itself.  The worker will send a reload
// message to the Firefox api.
function workerReload() {
  var port = navigator.serviceWorker.controller;
  port.postMessage({topic: "worker.reload", data: true});
}
function updateManifest() {
  var port = navigator.serviceWorker.controller;
  port.postMessage({topic: "worker.update", data: true});
}

// we open a flyout panel which appears to one side of our sidebar.  The offset
// allows us to line up the panel with our content.  We also get a reference
// to the window in our callback.
var panelWin;
function openPanel(button) {
  var div = document.getElementById("hovertest");
  var baseOffset = button.offsetTop - div.scrollTop + (button.clientHeight/2);
  dump("*** opening panel with offset "+baseOffset+"\n");
  navigator.mozSocial.openPanel("./flyout.html#"+button.value, baseOffset, function(win) {
    dump("window is opened "+win+"\n");
    panelWin = win;
  });
}
function closePanel() {
  if (panelWin) {
    panelWin.close();
    panelWin = undefined;
  }
}
if (navigator.mozSocial && navigator.mozSocial.loadPanel) {
  dump("********** preload the flyout\n");
  navigator.mozSocial.loadPanel("./flyout.html", function() {
    dump("********** flyout has loaded, ready open it\n");
  });
}

// we open a chat panel, receiving a reference to the chat window in our
// callback
var chatWin;
function openChat(event) {
  navigator.mozSocial.openChatWindow("./chatWindow.html?id="+(chatters++), function(win) {
	dump("chat window is opened "+win+"\n");
    chatWin = win;
  });
}

// this notify function is used for manual testing.  We tell the worker to
// call an api for us so we can:
// 1. make the worker request a chat window is opened
// 2. make the worker send a notification
function notify(type) {
  //var port = navigator.mozSocial.getWorker().port;
  var port = navigator.serviceWorker.controller;
  // XXX shouldn't need a full url here.
  switch(type) {
    case "link":
      data = {
        id: "foo",
        type: null,
        icon: baselocation+"/icon.png",
        body: "This is a cool link",
        action: "link",
        actionArgs: {
          toURL: baselocation
        }
      }
      port.postMessage({topic:"social.notification-create", data: data});
      break;
    case "chat-request":
      navigator.serviceWorker.controller.postMessage({topic:"social.request-chat", data: baselocation+"/chatWindow.html?id="+(chatters++)});
      port.postMessage({topic:"social.request-chat", data: baselocation+"/chatWindow.html?id="+(chatters++)});
      break;
  }
}
