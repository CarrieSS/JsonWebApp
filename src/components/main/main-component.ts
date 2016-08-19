export function MainComponent() {
	return {
		restrict: 'E',
		transclude: true,   
		scope: {},
		controllerAs: 'ctrl',
		controller: MainController,
		template: require('./main-component.html'),
		bindToController: true
   };	  
}

const MainController = function ($http, $timeout) {
  let companyCode = '1234';

  this.isAuthenticated = false;
  this.showError = false;
  this.showSaveSuccess = false;
  this.previousSetting = {};

  this.login = (code) => {
		if (code != null && code.length === 4) {
			this.companyCode = code;
			this.isAuthenticated = true;
			
			$http.get('http://localhost:5000/getClientSettings', { 
				params: { comCode: this.companyCode} 
			}).then((response) => {
					this.messageEn = response.data.FileEn;
					this.messageFr = response.data.FileFr;
					angular.copy(this.messageEn, this.previousSetting);
		  		return this.previousSetting;
				});

		} else {
			this.showError = true;
			this.errorMessage = 'Invalid company code';
			$timeout(() => {
				this.showError = false;
			}, 3000);
		}
  };

  this.saveConfirm = () => {
		let inputs = document.getElementById('Menu').getElementsByTagName('textarea');
		let objEn = Object();
		let objFr = Object();

		for (let i = 0; i < inputs.length; i++) {
			if (inputs[i].value === '') {
				objEn[inputs[i].id] = inputs[i].placeholder;
		  	objFr[inputs[i].id] = inputs[i].placeholder + 'FRENCH';
			} else {
				objEn[inputs[i].id] = inputs[i].value;
				objFr[inputs[i].id] = inputs[i].value + 'FRENCH';	
			}
		}

		angular.copy(objEn, this.previousSetting);

		const jsonObj = {
			JsonObjectEn: objEn,
			JsonObjectFr: objFr
		};

		$http.post('http://localhost:5000/saveClientChanges/' + this.companyCode, 
			jsonObj).then((response) => {
				this.saveSuccess = response.data;
				this.showSaveSuccess = true;
				$timeout(() => {
					this.showSaveSuccess = false;
				}, 3000);
			});
	};

	this.cancelChanges = () => {
		this.messageEn = angular.copy(this.previousSetting);
		window.location.reload(false);
		return this.messageEn;
	};
};

MainController.$inject = ['$http', '$timeout'];
