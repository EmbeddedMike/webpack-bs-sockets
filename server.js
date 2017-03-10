/**
 * Require Browsersync along with webpack and middleware for it
 */
var express = require("express");
var browserSync = require('browser-sync');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

/**
 * Require ./webpack.config.js and make a bundler from it
 */
var webpackConfig = require('./webpack.config');
var bundler = webpack(webpackConfig);

/**
 * Run Browsersync and use middleware for Hot Module Replacement
 */
var bsConfig = {
    server: {
      baseDir: 'app',
      ws: true,
      middleware: [
        webpackDevMiddleware(bundler, {
          // IMPORTANT: dev middleware can't access config, so we should
          // provide publicPath by ourselves
          publicPath: webpackConfig.output.publicPath,

          // pretty colored output
          stats: { chunks: false }

          // for other settings see
          // http://webpack.github.io/docs/webpack-dev-middleware.html
        }),

        // bundler should be the same as above
        webpackHotMiddleware(bundler)
        
      ]
    },

    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
      'app/css/*.css',
      'app/*.html'
    ]
  

};
const a = () => console.log("A");
a()
var bs = browserSync.create()
const initted = function() {
  console.log("SOCKETS"); 

  var sock = bs.sockets;
  
  sock.on('connection', function (socket) {
    var addedUser = false;
    console.log("SOCKET connected~~~~")
    socket.use(function(packet, next){
      console.log(packet)
      return next();
    });
    // console.log(socket)
    // when the client emits 'new message', this listens and executes
    socket.on('this', function (data) {
      // we tell the client to execute 'new message'
      console.log(data);
    });
    socket.emit("this", "to myself")
  });
};
  // sock.on ("connect")

bs.init(bsConfig,initted);