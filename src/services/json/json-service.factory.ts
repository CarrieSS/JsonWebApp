export default angular.module('fs.services.jsonFactory', [])
  .factory('jsonService', ($http) => {
    const factory = {
  		readDefaultJson: () => {
  			return $http.get('default.json').then((response) => {
					 return response.data;
				});
  		}
  	};
  	return factory;
  }).name;
