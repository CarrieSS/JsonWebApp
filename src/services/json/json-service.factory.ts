export default angular.module('fs.services.jsonFactory', [])
  .factory('jsonService', ($http) => {
    const factory = {
  		readDefaultJson: () => {
  			return $http.get('default.json').then((response) => {
          console.log(response.data);
					 return response.data;
				});
  		}
  	};
  	return factory;
  }).name;
