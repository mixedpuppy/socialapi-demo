/* global describe, it, before, after */
/* jshint expr:true */

var app = require("../../app").app;
var expect = require("chai").expect;

var serverPort = 3000;
var serverHost = "localhost";
// XXX For now, the sidebar page isn't really in the social sidebar,
// so just add it.
var serverHttpBase = 'http://' + serverHost + ':' + serverPort +
                     '/index.html';

var webdriver = require('selenium-webdriver'),
    By = webdriver.By;

var driver;

describe("browser tests", function() {
  this.timeout(60000);

  before(function(done) {
    app.start(serverPort, function() {
      driver = new webdriver.Builder().
        usingServer('http://localhost:4444/wd/hub').
        withCapabilities({'browserName': 'firefox'}).
        build();

      done();
    });
  });

  after(function(done) {
    driver.quit();
    app.shutdown(done);
  });

  it("should open the homepage", function(done) {
    driver.switchTo().frame("//#social-sidebar-browser");
    driver.getTitle().then(function(title) {
      expect(title).to.equal("DemoSocialService");
      done();
    });
  });

});
