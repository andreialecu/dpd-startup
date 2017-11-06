var Resource = require('deployd/lib/resource'),
  Context = require('deployd/lib/context'),
  util = require('util'),
  fs = require('fs'),
  path = require('path');

function StartupResource(moduleName, options) {
  Resource.apply(this, arguments);
  this.moduleName = moduleName;
  this.server = options.server;

  var _this = this;
  this.on('changed', function (config) {
    _this.load(function() {
      _this.runStartup();
    });
  });

  options.server.once('listening', function() {
    _this.load(function() {
      _this.runStartup();
    });  
  });
}
util.inherits(StartupResource, Resource);

StartupResource.label = "Start-up Module";
StartupResource.events = ["index"];

module.exports = StartupResource;

StartupResource.prototype.clientGeneration = false;

StartupResource.prototype.handle = function (ctx, next) {
  next();
};

StartupResource.prototype.runStartup = function () {
  if (this.events.index) {
    var ctx = new Context(this, {url: this.moduleName}, {}, this.server);
    var domain = {};
    this.events.index.run(ctx, domain, function(err) {
      if (err) console.error("Error in dpd-startup script: ", err)
    });
  }
}