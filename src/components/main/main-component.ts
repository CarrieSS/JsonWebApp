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

const MainController = function ($http) {
  let companyCode = '1234';

  this.$http = $http;
  // // this.jsonService = jsonService;
  this.isAuthenticated = false;
  this.showError = false;
  this.showSaveSuccess = false;

  this.login = (code) => {
		if (code != null && code.length === 4) {
			this.companyCode = code;

			this.$http.get('http://localhost:5000/getClientSettings', { params: { comCode: this.companyCode} })
		  	.then((response) => {
				this.message = response.data;
			});

			this.isAuthenticated = true;
		  return companyCode;

		} else {
			this.showError = true;
			this.errorMessage = 'Invalid company code';
		}
  };

  this.saveConfirm = () => {
		let inputs = document.getElementById('Menu').getElementsByTagName('input');
		let obj = Object();
		let objFr = Object();

		console.log(companyCode);

		for (let i = 0; i < inputs.length; i++) {
	    obj[inputs[i].id] = inputs[i].value;
		  objFr[inputs[i].id] = inputs[i].value + 'FRENCH';
		}

		const jsonObj = {
			JsonObjectEn: obj,
			JsonObjectFr: objFr
		};

		console.log(JSON.stringify(obj));

		this.$http.post('http://localhost:5000/saveClientChanges/' + this.companyCode, jsonObj)
		.then((response) => {
			this.saveSuccess = response.data;
			this.showSaveSuccess = true;
		});
	};
};

MainController.$inject = ['$http'];
