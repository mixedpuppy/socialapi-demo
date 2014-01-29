var loc = location.href;
var baseurl = loc.substring(0,loc.lastIndexOf('/'));

var manifests = {
  "demoTest": {
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
  },
  "facebook": {
    "origin": "https://www.facebook.com",
    "name": "Facebook Share",
    "shareURL": "https://www.facebook.com/sharer/sharer.php?u=%{url}",
    "iconURL": "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAX0lEQVQ4jWP4%2F%2F8%2FAyUYTFhHzjgDxP9JxGeQDSBVMxgTbUBCxer%2Fr999%2BQ8DJBuArJksA9A10s8AXIBoA0B%2BR%2FY%2FjD%2BEwoBoA1yT5v3PbdmCE8MAshhID%2FUMoDgzUYIBj0Cgi7ar4coAAAAASUVORK5CYII%3D",
    "icon32URL": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAADbklEQVRYCc1Xv08UQRj99tctexAuCEFjRE0kGBEtLDSGqIWNxkYKbTAxNlY2JhaGWltNtNFeKgsKKxITK43/gCYW+IsoRhA4D47bH7fn9+bcvdm5JR7sefolC3Ozu9978+bNN7PayUv3HN3umdY0Y6IWBtSJ0HSTarXqTOiuTep6Lj+tdxAcA8RAgSmwdd2aCDs0clldYALb/FvgYVhjmfliVA2XpjEgWo0Attn42Z6WH1RFor5ehwo9XQIUZMoVn4qlCoVMSo62EvD8Kh0b3U2Xz43R2PBO6mUCGDlAf65V6MadZzT/rUimoccc2kYA4BfPHqJb105RzjJigKhRq9kEJUBIjgYVuXeL7SAI6eD+Abp5dTwVHOmEHxT50d8WBYJqSOdPj5BjW8gZR8UNqFR2xagx/65XFYaMH+BGWwiYpi4UkBPPLxTp9v1Z+lHc4DWvCQXWmIy6EjITgKowVd5Jjv7N3Hd6y5esigoOwpkJIAmMpZpLJGdiaaC4F0UmAj6bD84GCEwmB/qxMmRilmnwb/mpjAocHh4UEoNAt5NLZB7oy9OJo0PxqkAtePdhiSqunyC1LQUwWMPQaOr6GRre258Ajn4cP7KHcEXhsxpXbj+lT19X2TMNGTLVAcjcalS8gDwsQ2UOMhH4k8FkcrEn5E5ub2sKohxLK2VR77Hl9RUcsrgeRIEiVOT6z+tDbIeLy+vk+kGTCbXxycet6xhl//3f6bJEkdHYhA+mLtDIvoH4ieev5+juoxdk5+pjhALYEdXIpEB5w+NlSKSzqVQ/+H7IO6BLtl3fngGMiqhGJgIwlM6qpyUGFjySdk8m0Zg0ubeD7X9OIDEFajltRQgUJaUKx69tdgaQa0FMADuahZPMFtcEwNPm2hA7ZI5sK4aoE2NvYI+o8hkCIe7CwTv68zS0q9Dk5vpbm/8FXxitSzmMFHpsGj0wyLUheTwD2Y9fVgh1Ae0EPUgD9241ZEnld+v5kgnVZ/8fE0brVh5BK+1oCqKKF72Dk7HwBsssB/pklU1dfChy3S659H5+uelgIb+8WRv1/uGTV9Sdb5wJFlfW6fPCalMhwhSU1j2xKwKbP838GcOwJja4TqO0bjdmXxYTy1EYjFdCWoCEYZhseH/GDL3yJPHnuW6YmT7P1SlIA4768Hke4vOcsX8BE346lLHhDUQAAAAASUVORK5CYII=",
    "icon64URL": "data:image/png;base64,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",
    "description": "Keep up with friends wherever you go on the web.",
    "author": "Facebook",
    "homepageURL": "https://www.facebook.com/about/messenger-for-firefox"
  },
  "pocket": {
    "name": "Pocket",
    "iconURL": "data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAABZSNAA8PH3AObn4gD38vQA6urqAOHZ8QD08PoA6+/1AE9F6gBUQuoA6OnlAFRB7QDj5+sA6OjoAOTk4wDx8vUAVkiwAObn4wBQQ+gA4eXpAFZE5QDm5uYATjnbAFJKzADm5PQA6urjAFM+7gDf5ucAop7VAFE62QBTP+wAUz7vAN3k5QBKtfwASTzUALev5wBqWMYA3drxALjphgDm5+UA9+76AOfn5QBOOtoATT7wAN/Y9wBUP+0AVkfOAFU/7QC1uFIAuLhSAE474ADs5/YA4OPpAPXv+ABcQu0AXULtAOPj6QDo6OMATzvYAO/o6wDr6+sAV0izAO3n7gDm5+YAU0DrAFBB4ABUQOsAW0PaAFM/7gBUP+4AVD7YAPP18ABbQOsA6enpAPLv+QBRO+EAWEDbAOLn5wDo6OQASLf5AFRA7ADj5uoA5+fnAFVA7ACzuVEA9/X5AOjm6gBSP+cATTviAFNC5wDn6OUAUEDtAEs+2gBUQO0AW0HqAF9RxQDo6PYAWUfRAOrm6wBSP+gA9/nvAOHk6QDm5eYAW0TiALvqhwDq6OYA7/T2AOfn4QBZReAA6OjnAOro5wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaGhoJlQwMDEICQkLTyEhISkpKQ4nOTk5ODQ0NBMgGxsVFRUVFRUVaW4VFRUVFRUVFRUVFT8+YD0QM05aERUVFRUVZm0lIh0qFjpcBVoVFRUVFQocMktLS0tLS1gjVhUVFRUYV2NjY0xGY2NjQTsVFRUNXx4eHkMoA2ceHhokUhUVYh5dHwAGZEc1YS1dHgoVFRkeRC4BVVsrD0oXU11RFRUZHl0UahJdXVkHQl1dDBUVGR5dUEVEXV0fLy1dXQwVFWtALS0tLS0tLS0tLVBlFRVmLF5ISEg3NkhISGxNAhUVFRUNSQQ8PDw8BEkNFRUVFRUVFRUNSQRJSQ0VFRUVFQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
    "markedIcon": "http://img.readitlater.com/i/getpocket.com/favicon.ico",
    "unmarkedIcon": "http://img.readitlater.com/i/getpocket.com/favicon.ico",
    "origin": "https://getpocket.com",
    "markURL": "https://getpocket.com/save?url=%{url}&title=%{title}",
    "shareURL": "https://getpocket.com/edit?url=%{url}&title=%{title}"
  },
  "pinterest": {
    "name": "Pinterest",
    "iconURL": "http://passets-ec.pinterest.com/webapp/style/images/favicon.7126dab5.png",
    "sidebarURL": "https://m.pinterest.com/",
    "origin": "https://m.pinterest.com",
    "shareURL": "http://pinterest.com/pin/create/button/?url=%{url}&description=%{title}"
  },
  "yammer": {
    "name": "Yamer",
    "iconURL": "http://mixedpuppy.github.com/yammerer/icon.png",
    "workerURL": "http://mixedpuppy.github.com/yammerer/worker.js",
    "sidebarURL": "http://mixedpuppy.github.com/yammerer/sidebar.htm",
    "origin": "http://mixedpuppy.github.com",
    "shareURL": "https://www.yammer.com/home/bookmarklet?u=%{url}"
  },
  "googleplus": {
    "name": "Google",
    "iconURL": "https://www.gstatic.com/images/icons/gplus-16.png",
    "icon32URL": "https://www.gstatic.com/images/icons/gplus-32.png",
    "icon64URL": "https://www.gstatic.com/images/icons/gplus-64.png",
    "statusURL": "https://plus.google.com/app/basic/",
    "origin": "https://plus.google.com",
    "workerURL": "",
    "shareURL": "https://plus.google.com/share?url=%{url}",
    "pageSize": {
      "social-share-panel": [520, 500],
      "social-notification-panel": [330, 386]
    }
  },
  "outlook": {
    "name": "Outlook",
    "iconURL": "https://mail.live.com/favicon.ico",
    "origin": "https://mail.live.com",
    "shareURL": "https://mail.live.com/?rru=compose&subject=%{title}&body=%{body}",
  },
  "gmail": {
    "name": "GMail",
    "iconURL": "https://mail.google.com/favicon.ico",
    "origin": "https://mail.google.com",
    "shareURL": "https://mail.google.com/mail/?view=cm&ui=2&tf=0&fs=1&body=%{body}&su=%{title}",
    "pageSize": {
      "social-share-panel": [500, 500]
    }
  },
  "digg": {
    "name": "Digg",
    "origin": "http://digg.com",
    "shareURL": "http://digg.com/submit?url=%{url}&title=%{title}",
    "iconURL": "http://digg.com/favicon.ico",
    "sidebarURL": "",
    "workerURL": ""
  },
  "twitter": {
    "name": "Twitter",
    "iconURL": "http://www.twitter.com/favicons/favicon.png",
    "origin": "https://twitter.com",
    "shareURL": "https://twitter.com/intent/tweet?url=%{url}&text=%{text}"
  },
  "delicious": {
    "name": "delicious",
    "iconURL": "https://delicious.com/favicon.ico",
    "origin": "https://delicious.com",
    "shareURL": "https://delicious.com/post?url=%{url}&title=%{title}"
  },
  "linkedin": {
    "name": "LinkedIn",
    "iconURL": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAm5JREFUeNp8U0trU0EU/mZyb9I8amrQYGq0GjdWio/iwq7qUgVduVDciRv39U+04MKNC7euRFAoisVFUKGKCwWLaNUaa8VXmia1yU3ua8ZzJknTKvRcLnfmzJzv+87jiqniwr1KwzsthRAg02ib2GLNppTGjlT0obhy543avz0h3FDBDzUICDFLYiPYRusCSFos1RxtLTt+4GnHHhqI49xIFnM/1/C0tAJLSmxlDFBr+qFVaXqouQGuju3FiT1pjObTePShjLrrQkqxOUr3JDC844WwVl3f+DnoQCaO50s1LNYcKN1lEubcpxQZz45IA8I4fqAgCpNFT0aEzRdz/TFUHR91Qk5GI5SGwBqp47NCJoFWEOJz1THpRRhB6cByfYV6I8S18QIuH8/jfbmB87df4fqZYYwNDeDxx2UMZ1MYHdyGJjHef/sLEw/eUToaESKQvh+iSSxJO2IUZJNRuLTPJGyzvnR0EAd3pkhJiDh15+KRHMb3ZVAjpT6Ry5ByC0laQF+YXDXlFpr82OZJ0aHJIk7enEW1GRjfyK5+tIiEY6VH1QoDjaBTNU2PF+j1GZj9UsXi7zpef/+D0opjfFwbRUQcK02gIhW6HWJwaN/tQqDUehe7PnOX/BwrjVP3Drv9XtfAE65NzTbPQydGmhN6+zrjm4pZZs9tZItTcbt3UrG2z4x6h9kyyDQcM/NlU7hvqy2Clbj14iuefKrgJQ0Wn7PdeFZCPt2H4kKFC2FwhZyY1opXPr1UfTNurILaxnmaYFbDRF7QZrZobwv6SFgXju2+Oz3345SK/jP4Uev/PyjW80n6n88ezs38FWAAzAg/WebH1yoAAAAASUVORK5CYII=",
    "icon32URL": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAZCAYAAAAmNZ4aAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABJFJREFUeNqsVl1oHFUU/u7M7OxfyuanadNtlGz8KYl5kASsD1oEqfgiJvimfRBUCPgkFd98UF/6VtASEMQfahERCiJCfahIKVYakuJPbWsTo92ENSaN3U2ymZ07M9dzZnY3O7OTPkRnuXtnzrn3fOfvnnPFniPPH3/m5dfe2pfLZl3Xw//16LqOxduV9UufvffqlU9OnO49cDDEFxMfXraPHupLSMelT8WkOiv6jrvw4tcx+IXrxfmT4w+N5HtyViuwYSYSiVLFgiRrBa2XLvx3XQNM/vOFtAqMUwKx63RNIJntyAkznSJCGLhsSaxu2XA9BdtVuKczjbF9OZTWLfxcWkfCB98dsCBLKpb0aFLRUBgb0sE/BE58FLozeOOJAjpM3WdO/XAL39xYQdLQdhVnQb8tCmEMLoyq7aJsOaSZg4mR/U1Qfo4UuvHFTyUknd0BM9yWdJVoeqcFmDXaqDmokuXX/t4IMW+sbIJDkUnouwLmMxKclBhgixjrBOqRfl9dX8beDhNP3teDm7erOHlxAbbnwZVqZ+FK+S4VIo5HmQ0/1O3ANccja4OjRF7B2+dv4sR3c5C0aw+5PWsaqJJXtmy3uSlNdEn7GC1L764XyNDpO5XQmjlG4pDUhIoFdshim4TYNBe6Mnjn6CHaF1hx7rcVfH1tGWP9nXhxrL+56dT3f6A/l8Irj9yLQUpIScC/Lm/gg+kiZpbKyFJoWAZH19ghSgZbaTsKm7aHrpSJFx7ON5lLZQufziyiryMZoqcoy58d3g9D2zZlqLcDTz/Yi4nTM5gulpEmy9kTptDjDIbmEbBDFrtsteOGmDU6YuwvW4bpz430hUAbD7v9+OOD4CrIMjkcnhefH5qi5FDkZsUBiSxiHsgbKmbvmdklvPT5j/h4ejFEHz2YQ2/GDHKAi1JNQkrZ7mquWJJy2vF4hBGYB85qL9w8zlFROXZm1n//iOJ6/94sHit0+d+daQOdKQPLVPkMTYNUDlnvtFvMYDaNGg0nYhofMdY6qtC3c6v+Ic0kDd9Ts5RQTUsoBIJGzQ3kun4PiTnHLruaDfItiwA36BFXc8Fh//sK0WxFcoPlcGwdQbNQKi65DDbSt4xevKjFKp5eT4AmP66oNPisWywwgwoVCFKRYq7qCrXTw8AqItqr81Uw4noEtNbGFlVe1aXE0kP7oqchZL3SY6qI0SYl0tb8vhqJkmisr4/W3AnzFDKZDH5fmHfe//LsA47rjk5OTp7P5/Orhgoh7wAgYvpdIwRKtbGFqCNzrU6msLS4qE9NTR0mxqOjo6Ol8fHxC9sW0/3ol78qOPzuxSborTtbAJXLS3+uhegLa1WSaAQK0HyKuthZ6tsNUQvU2aBp9Th7wjB0t6en+0rfgbwcHh6eC1y9rSY26TJweX615aqo8cFEuSrb6XogGHRmiwRUXGnp5RzT+k2IslqjKUFfV4eGhq4ODAzUz7vGNUQZvhBeHG36d6M3Zl34Hou7guTSZiWtS0v5lwLXr2KmaUJ7KlV6XbOtO7Gd/D89AglprR0b1N5MG8LigqJp21eofwUYABnolxra9d85AAAAAElFTkSuQmCC",
    "icon64URL": "data:image/png;base64,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",
    "workerURL": "",
    "sidebarURL": "https://touch.www.linkedin.com/",
    "origin": "https://www.linkedin.com",
    "shareURL": "https://www.linkedin.com/cws/share?url=%{url}"
  },
  "soundcloud": {
    "name": "Sound",
    "iconURL": "http://soundcloud.com/favicon.ico",
    "sidebarURL": "http://m.soundcloud.com/dashboard",
    "origin": "http://m.soundcloud.com/dashboard"
  },
   //weibo worker is dumping a bunch of console stuff
  "weibo": {
    "origin": "http://m.weibo.cn",
    "name": "Weibo",
    "workerURL": "http://m.weibo.cn/js/social/worker.js",
    "iconURL": "http://weibo.com/favicon.ico",
    "sidebarURL": "http://m.weibo.cn/sidebar/"
  },
  "mixi": {
    "version":"1.0",
    "name":"mixi",
    "author":"mixi, Inc.",
    "description":"çDÇ´Ç»WebÉTÉCÉgÇå©Ç»Ç™ÇÁmixiÇÃÉ`ÉFÉbÉNÇ‡Ç≈Ç´ÇÈï÷óòÇ»ÉcÅ[ÉãÇ≈Ç∑ÅBóFêlÇ™Ç¬ÇØÇƒÇ≠ÇÍÇΩÉCÉCÉlÇ‚ÉRÉÅÉìÉgÇí ímÇ∑ÇÈÇÃÇ≈ÅAå©óéÇ∆Ç≥Ç∏Ç…Ç∑ÇÆÇ…Ç®ï‘éñÇ™Ç≈Ç´Ç‹Ç∑ÅBÇ‹ÇΩóFêlÇ™ç°âΩÇÇµÇƒÇ¢ÇÈÇ©ÇÇ¢Ç¬Ç≈Ç‡ämîFÇ≈Ç´Ç‹Ç∑ÅB",
    "origin":"https://mixi.jp",
    "sidebarURL":"https://mixi.jp/firefox_sidebar.pl",
    "homepageURL":"https://mixi.jp/promotion.pl?id=social_sidebar",
    "shareURL":"https://mixi.jp/share.pl?from=social_share&u=%{url}&k=39170634f795be8b2656924b73b9306ccd46d35c",
    "workerURL":"https://mixi.jp/static/public/js/sidebar/firefox/worker.js",
    "iconURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozMDZFOUZCMDkyQzIxMUUyOEM1RTgyQ0UwMUE5RjI0RiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozMDZFOUZCMTkyQzIxMUUyOEM1RTgyQ0UwMUE5RjI0RiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQ0QkM3NDc1OTJDMTExRTI4QzVFODJDRTAxQTlGMjRGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQ0QkM3NDc2OTJDMTExRTI4QzVFODJDRTAxQTlGMjRGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+fT8vWQAAAkxJREFUeNpi/P//PwMlgBFdIDtST4GLg6Weg50lgJmJUQAm/vff/w8/fv7Z8O3Hn8apyy89wGpAWZJxv7AAR4GYEBeDAC87AxsrEwMjIyMDyJW/fv9j+PD5J8PLt98YXr/7nti78NwCFANq0k3ny0vyJUiL8wA1szGwszEzMDOBDGBgAPny779/DD9//WV49/EHw8NnnxkePv+c2DXv7AJmkObqNNMCZVn+CiBm0LaMZuBgZ2YQVnBg4BSQZ/j27g6DqKoHA7+kAdhFrP8/AOVZGP4xMLlqKAhMYwEZIC8rWi0vyc7AD3S2lE4Iw9/f3xg+PTvDwCflwSCuGczw4+NDsCtFVDwYvu/IZxAGhgwwLLh//JGIZKnLNHMQ4mEQ4eNhBzoZ4qNnlxYzvH94iEH82xsGQXlbhruHWhiYWbkYtH1ng13159d1Bn4eNgYFRRkHJkv7QA1eLjYGVhYmeGD+/vYaif0GEgtAV8FDHmgPSD03Nw8vExMzIwMLEDMykp4GePjF3zFpGXvc/kdiWgLFyn9G9n8aJr47GYFxzHft2IJ7P57uFGZhZiLKgD9//zGwSTg/07FN0WQCJpRPWlYJjRyipp/+EuEUUKL6xyb+E6i5A6SXEUmi/cn1HQnv7mwW/v/rAyu2MPkHtIBVUPuLskXWIU4eIW+MpAw0JAhI5Xz7+Ezh++eXYEPePjjE9+X5ST5GZo5/ohphr6Q1PdYB1VSCbMfnTGkgNgPhS4fmbXl4ddvzn98+noNagJobicjOME17gBjDVoAAAwDPu94Fx/JhBAAAAABJRU5ErkJggg==",
    "icon32URL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpENEJDNzQ3MzkyQzExMUUyOEM1RTgyQ0UwMUE5RjI0RiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpENEJDNzQ3NDkyQzExMUUyOEM1RTgyQ0UwMUE5RjI0RiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQ0QkM3NDcxOTJDMTExRTI4QzVFODJDRTAxQTlGMjRGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQ0QkM3NDcyOTJDMTExRTI4QzVFODJDRTAxQTlGMjRGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+0Zya+QAABRJJREFUeNrEV11sFFUUPjOzMzs7u92Z2W532227u6Ur7VJsS02VBqnwYAIvNYJREQnhgRcIAaNI6hPxxZ+YgJFoeDCGNBhCDNSEGB54wBpFTZtWjC3B8tNq20CX7S5s9292Zz331sXd7fYvLfYkNzNz5977nfOdc+49l8lkMrCawixl8KE3mrYIPIeNfYHn2WaWYZTc/8QWLaVfTWrpgYSW/v6zs791L1uBA683Kiaj4YhF4vdaLYJXtgiA74B9YDCwwDD/LZFO6xCLpyAS0+BhJAmhR4m7j6a1M7FE6uTn566HlqzA23tbjqiKeNyhirJdMUGJWUBgDpAFCo4MQA4+EHciA5DUdIgnUhBGJQJTMbgXjI8GQ7HDJ7r6uxelwMFdjYrNKl50OcxbXGVmUGURJBEt5tg8wPmEuCOFjESRjUAoDmP3IjB2f/rkh1/2vpU7jiucePjN5uYKh2XA55brayqtYFdNlG6OYxYNTi3DsRzLgFEwUJeRhmtsbKyze3v6xr8tqsCRPc1et8v661q3bK1yWsCKlHNLsHpORXANERkkLGLMNK9/qjT8Q9/4z3kKHNrdpLjL1Su+6pKqSocFRKMhL8CWKyReBIGjjKQzbHu9V/n6p4GJkCE7oMJpO1ZdLjaUl0o0yAi2IJWBYLZDOhmFWHgEOF4Ck+IBUfZAHL8jk0N5ICbsF/F/WotCPDQCyehk3n/iEpJFLrsoRRNlH2HXa9TEo/tavHVe9c5ajwKYao8td/p3YtsB04EhCI70gKtxD1UiKwRg5NoJ+u5q2gNmuz8PMDB8Gcavd80KzmkMzOHREAzeDtZQF7y6vfG0p8LUYMNo51j28WBL2TpsfgQ1g1LVBizHU2WIhbyo0H6p1Ad233YwlrioQvHwKO0nYyWbj45PRgOzYiKjZyDDqzMusMmGDtVqpGlWTIjVxAXE2iytdt82ygihnQixlFicHV+/7VP6VN3ts1xFXEGyQpWlDvb4gee2yBIjGgVu3iCaQIBcn06hS3Lfs+B0R0SGHo730nfBXFZ0PRJnIp9xszW1dbvNJEdZdk5wAlxoBQHJSniir8icwLwGkZ1UTwbtrMNZVSkY5s91bYHFdG16yWlpwI1NRNZZssOxLLMqR7HiqIsaVqsO0FIZSELmAWsQpNhq1CTkoLLY1oyy5d4NA/oqaKBpaSivab3I+lu2f8PwivZ/6qDjJiTan45U+1rP0ei72XthMDx83o+lVn6uFpwFhUJ2SSIx3Pdz03KhuVGsmtwbj56vrG2dOQuwktnRe6mzi0+MSCt5AhaTNFovOJ6famg/sAmxhtiZ/Zm5sH7ru5cSaf6JhgMp2XTemfA07TxFwOkxnf0pmtX9vs2dNzK8/ETigVbMuqC7W/Zds8jOT4rWhKihPxELn7517dSGZPAPy0ptUAQ8DYJes+nYDbW8/pWs9UWLUlTCio8PHvzV3zH++9kyPTZuXE5cENoZsSJR/cz+W4Xg85blOPFZfLwXvn+zOXDnqjUe/FNKRceWpAxJN15tiNS2HewRJeWdQvBFXUyIW/DxMjaikP/B3/1Sfq0HcPvHj6t4A5tHOSPImnPdrkln7WZyF+hE8IdFD6WFq1qq9VABM3kSiWq/kIKGBi9n1K3VW6dc6zoGjSb5fZx/ZcXuhnPJd1+8lKl2+xK2NS9O2T1tE4LJ+hV2n5nL6hWXybGhu8hMN9nQ/g3ixd8bVuh67s9101LkHwEGAHiA8Hoi/Qh6AAAAAElFTkSuQmCC","icon64URL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpENEJDNzQ2RjkyQzExMUUyOEM1RTgyQ0UwMUE5RjI0RiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpENEJDNzQ3MDkyQzExMUUyOEM1RTgyQ0UwMUE5RjI0RiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQ0QkM3NDZEOTJDMTExRTI4QzVFODJDRTAxQTlGMjRGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQ0QkM3NDZFOTJDMTExRTI4QzVFODJDRTAxQTlGMjRGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+zVczFAAACZBJREFUeNrkW3ls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"
  },
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
    btn.appendChild(document.createTextNode(m.name));
    list.appendChild(btn);
  }
  parent.appendChild(list);
}