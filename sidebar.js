
function onLoad() {
  var worker = navigator.mozSocial.getWorker();
  $("body").css("background-color", worker? "green": "red")
  $("#domain").text(location.host);
  var data = document.cookie.split("=",2)[1];
  userIsConnected(JSON.parse(data));
}

// a fake login function that sets a cookie.  Our worker is polling for
// cookie changes and will update the user-profile based on this.
function signin() {
  var end = location.href.indexOf("sidebar.htm");
  var baselocation = location.href.substr(0, end);
  var userdata = {
    portrait: baselocation + "/user.png",
    userName: "matey",
    dispayName: "Bucko Matey",
    profileURL: baselocation + "/user.html"
  }
  document.cookie="userdata="+JSON.stringify(userdata);
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
    var worker = navigator.mozSocial.getWorker();
    worker.port.postMessage({topic: "broadcast.listen", data: true});
  },
  "social.user-profile": function(data) {
    if (data.userName)
      userIsConnected(data);
    else
      userIsDisconnected();
  },
};

navigator.mozSocial.getWorker().port.onmessage = function onmessage(e) {
    //dump("SIDEBAR Got message: " + e.data.topic + " " + e.data.data +"\n");
    var topic = e.data.topic;
    var data = e.data.data;
    if (messageHandlers[topic])
        messageHandlers[topic](data);
};
navigator.mozSocial.getWorker().port.postMessage({topic: "broadcast.listen", data: true});

// here we ask the worker to reload itself.  The worker will send a reload
// message to the Firefox api.
function workerReload() {
  var worker = navigator.mozSocial.getWorker();
  worker.port.postMessage({topic: "worker.reload", data: true});
}

// we open a flyout panel which appears to one side of our sidebar.  The offset
// allows us to line up the panel with our content.  We also get a reference
// to the window in our callback.
var panelWin;
function openPanel(button) {
  navigator.mozSocial.openPanel("./flyout.html", button.offsetTop, function(win) {
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

// we open a chat panel, receiving a reference to the chat window in our
// callback
var chatWin;
function openChat(event) {
  navigator.mozSocial.openChatWindow("./chatWindow.html?id="+(chatters++), function(win) {
	dump("chat window is opened "+win+"\n");
    chatWin = win;
  });
}

// just some test debug output for some events
window.addEventListener("scroll", function(e) {
  dump("scrolling sidebar...\n");
}, false);
window.addEventListener("socialFrameShow", function(e) {
  dump("status window has been shown, visibility is "+document.visibilityState+" or "+navigator.mozSocial.isVisible+"\n");
}, false);
window.addEventListener("socialFrameHide", function(e) {
  dump("status window has been hidden, visibility is "+document.visibilityState+" or "+navigator.mozSocial.isVisible+"\n");
}, false);

// this notify function is used for manual testing.  We tell the worker to
// call an api for us so we can:
// 1. make the worker request a chat window is opened
// 2. make the worker send a notification
var chatters = 0;
function notify(type) {
  var port = navigator.mozSocial.getWorker().port;
  // XXX shouldn't need a full url here.
  var end = location.href.indexOf("sidebar.htm");
  var baselocation = location.href.substr(0, end);
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
      port.postMessage({topic:"social.request-chat", data: baselocation+"/chatWindow.html?id="+(chatters++)});
      break;
  }
}

