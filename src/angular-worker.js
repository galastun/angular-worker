angular.module('worker', []).factory("worker", worker);

worker.$inject = ['$window'];

function worker($window) {
    var worker;

    return {
        create: create,
        terminate: terminate,
        onmessage: onmessage,
        postMessage: postMessage
    };

    function create(_script) {
        if($window.Worker) {
            if(!_script) {
                throw "No script was supplied.";
            }
            
            worker = new $window.Worker(_script);
        }

        else {
            throw "Browser doesn't support web workers.";
        }
    }

    function onmessage(callback) {
        if(worker) {
            worker.onmessage = callback;
        }

        else {
            throw "Worker is not defined.";
        }
    }

    function postMessage(message) {
        if(worker) {
            worker.postMessage(message);
            return true;
        }

        else {
            throw "Worker is not defined.";
        }
    }

    function terminate() {
        if(worker) {
            worker.terminate();
            worker.postMessage = null;
        }

        else {
            throw "Worker is not defined.";
        }
    }
}