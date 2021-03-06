/**
 * 3rd-party xdm-provider.js
 */

var YJ = {};

$(function() {
  "use strict";

  YJ.easyXDM = easyXDM.noConflict('YJ');

  var logger = function(str) {
    var d = document.createElement('div');
    d.textContent = str;
    var body = document.querySelector('body');
    body.appendChild(d);
  }

  var socket = new YJ.easyXDM.Socket({
    onMessage: function(message, origin) {
      console.log("I'm provider !");
      console.log("Recieved: ", message, " from origin: ", origin);

      logger("I'm provider !");
      logger("Recieved: ", message, " from origin: ", origin);
    }
  });

  //socket.postMessage("Hello 2nd !");
  //socket.postMessage(document.cookie);

  var rpc = new YJ.easyXDM.Rpc(
      {},
      {
        local: {
          providerLog: function(var1, var2, var3, onSuccess, onFailure) {
            try {
              // here is ajax to api
              var response = {'aaa': 'bbb'};
              onSuccess(response);
            } catch (exception) {
              onFailure(exception.message);
            }
          },
          dump: function(message, onSuccess, onFailure) {
            try {
              console.log(message);
              logger(JSON.stringify(message));
              var response = {};
              onSuccess(response);
            } catch (exception) {
              onFailure(exception.message);
            }
          }
        },
        remote: {
          consumerLog: {}
        }
      }
  );


});
