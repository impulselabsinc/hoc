// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.
'use strict';

const childProcess = require('child_process');
const localWebServer = require('local-web-server');
const os = require('os');
const open = require('open');

let mainWindow;
process.chdir(__dirname);
let port = Math.floor(Math.random() * 10000) + 8000;

var nodeInterpreter = (os.platform == 'win32') ? './node.exe' : './node';
let serverProcess = childProcess.spawn(nodeInterpreter, ['server.js', String(port)], {detached: false});
console.log('started server on port ' + port);

function createWindow () {
  setTimeout(function() {
    open('http://localhost:' + port, 'firefox');
  }, 9000);

  // Load the start page of the app after a brief pause to allow the server to start.
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
createWindow();


function killServer() {
  if (serverProcess) {
    try {
      // Make sure the server process is dead. This is supposed to
      // happen automatically for spawned processes but we've seen
      // cases where it isn't.
      process.kill(serverProcess);
    } catch (e) {
    }
    serverProcess = null;
  }
}

var cleanExit = function() {
  killServer();
  process.exit()
};

process.on('uncaughtException', cleanExit);
process.on('SIGINT', cleanExit); // catch ctrl-c
process.on('SIGTERM', cleanExit); // catch kill
