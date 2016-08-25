import 'angular';
import 'angular-mocks';

import {MainComponent} from './main/main-component';

describe('ComponentTest', () => {
	let _mockHttpService;
	let _mockSentData;
	let _mockResponseData;
	let _mockPath;
	let _mockId;

	angular.module('ComponentTest', [])
		.directive('mainComponent', MainComponent).name;

	beforeEach(() => {
		angular.mock.module('ComponentTest');
		angular.mock.inject(($rootScope, $timeout) => {
			_$scope = $rootScope.$new();
			_$timeout = $timeout;
		});
		_mockId = '1234';
		_mockPath = '/tasks';
		_mockSentData = {
			'sendvalue': 'Some sent value here.',
		};
		_mockResponseData = {
			'value': 'Some response value here.',
		};
		_mockHttpService = {
			get: (path) => {
				return Promise.resolve({ data: _mockResponseData});
			},
			post: (path, data) => {
				return Promise.resolve( _mockResponseData );
			},
		};
	});

	it('should load', () => {
		expect(_mockHttpService).not.toBeUndefined();
		let serverService = new ServerService(_mockHttpService);

		expect(serverService.get(_mockPath)).not.toBeUndefined();
	});

	it('should receive successful response to GET request', () => {
		expect(_mockHttpService).not.toBeUndefined();
		let serverService = new ServerService(_mockHttpService);

		return serverService.get(_mockPath)
			.then(data => {
				expect(data).toEqual(_mockResponseData);
			});
	});

	it('should encounter an error during GET request', () => {
		_mockResponseData = {
			status: 501,
			statusText: 'server error', 
		};
		_mockHttpService = {
			post: (path, data) => {
				return Promise.reject({ data: _mockResponseData });
			},
		};

		expect(_mockHttpService).not.toBeUndefined();
		let serverService = new ServerService(_mockHttpService);
		let error;

		return serverService.post(_mockPath, _mockSentData)
			.then(null, err => error = error)
			.then(() => {
				expect(error).not toBeUndefined();
			});
	});

	it('should receive successful response to POST request', () => {
		let serverService = new ServerService(_mockHttpService);

		return serverService.post(_mockPath, _mockSentData)
			.then(data => {
				expect(data).toEqual(_mockResponseData);
			});
	});
});
