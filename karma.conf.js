var path = require('path');
var webpackConfig = require('./webpack.config.js');

webpackConfig.module.loaders = [{
	test: path.resolve('./src/angular-worker.js'),
	loader: 'istanbul-instrumenter-loader',
	query: {
		esModules: true
	}
}];

module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		files: [
			'./node_modules/angular/angular.js',
			'./node_modules/angular-mocks/angular-mocks.js',
            './src/angular-worker.js',
            './test/app.js',
			'./test/*.spec.js'
		],
		exclude: [],
		preprocessors: {
			'./src/angular-worker.js': ['webpack', 'coverage']
		},
		reporters: ['spec', 'coverage'],
		colors: true,
		browsers: ['Chrome'],
		singleRun: true,
		webpack: webpackConfig,
		webpackMiddleWare: {
			noInfo: true
		},
		coverageReporter: {
			reporters: [
				{type: 'html'},
				{type: 'text'}
			],
			dir: 'coverage/'
		}
	});
}