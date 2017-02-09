describe("Worker Factory", function() {
	var $window, workerInst;
	
	beforeEach(angular.mock.module('test'));
    beforeEach(function() {
        module(function($provide) {
            workerInst = {
                onmessage: '',
                postMessage: function(message) {},
                terminate: function() {}
            };

            $window = {Worker: function(_script) {
                return workerInst;
            }};
            $provide.value('$window', $window);
        });
    });
    beforeEach(inject(function(_worker_) {
		worker = _worker_;
	}));
	
	it('creates a new web worker', function() {
        spyOn($window, 'Worker').and.callThrough();
        worker.create('script');
		expect($window.Worker).toHaveBeenCalled();
	});

    it('throws error because no script was specified', function() {
        spyOn($window, 'Worker').and.callThrough();
        
        expect(worker.create).toThrow("No script was supplied.");
	});

    it('browser does not support web workers', function() {
        $window.Worker = null;
		expect(worker.create).toThrow("Browser doesn't support web workers.");
	});

    it('posts a message', function() {
        worker.create('script.js');
        spyOn(workerInst, 'postMessage');
        worker.postMessage('message');

		expect(workerInst.postMessage).toHaveBeenCalledWith('message');
	});

    it('doesn\'t post a message because it wasn\'t created', function() {
		expect(worker.postMessage).toThrow("Worker is not defined.");
	});

    it('sets the onmessage callback', function() {
        var testFn = function() {};
        worker.create('script.js');
        worker.onmessage(testFn);

		expect(workerInst.onmessage).toBe(testFn);
	});

    it('onmessage - throws error because worker is not defined', function() {
        var testFn = function() {};
        expect(worker.onmessage).toThrow("Worker is not defined.");
	});

    it('terminates the web worker', function() {
        worker.create('script.js');
        spyOn(workerInst, 'terminate');
        worker.terminate();
        expect(workerInst.terminate).toHaveBeenCalled();
	});

    it('terminate - throws error because worker is not defined', function() {
        expect(worker.terminate).toThrow("Worker is not defined.");
	});
});