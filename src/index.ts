import * as angular from 'angular'; 
import 'jquery';
// import 'bootstrap-loader';

import components from './components'; 
import services from './services';

import './styles/index.css';

angular.module('fs.main', [
	components, 
	services
]); 
