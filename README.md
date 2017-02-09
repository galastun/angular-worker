# angular-worker
A web worker for AngularJS

# Usage
It's really pretty simple.

    let app = angular.module('app', ['worker'])
    app.controller('MyCtrl', ['worker', function(worker) {
      worker.create('script/location.js');
      worker.onmessage(function(message) {
          console.log(message);
      });
      worker.postMessage('Hello World!');
      worker.terminate();
    }]);
