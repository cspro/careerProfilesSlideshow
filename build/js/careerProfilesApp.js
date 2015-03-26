(function() {
	var app = angular.module('careerProfilesApp', ['ngRoute', 'ngAnimate']);
	
	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/competencies', {
				templateUrl: 'partials/main.tpl.html',
				controller: 'MainCtrl'
			}).
			when('/competencies/:compId', {
				templateUrl: 'partials/competency.tpl.html',
				controller: 'CompetencyCtrl'
			}).
			when('/competencies/:compId/:attrId', {
				templateUrl: 'partials/attribute.tpl.html',
				controller: 'AttributeCtrl'
			}).
			otherwise({
				redirectTo: '/competencies'
			});
	}]);
	
	app.run(function($rootScope, $location) {
		$rootScope.$on('$routeChangeStart', function(event, next, current) {
			// event.preventDefault();
			if (current) {
				console.log(current.controller + " --> " + next.controller);
			} else {
				console.log(next.controller);
			}
			/*
			if (current && current.controller) {
				if (current.controller == "CompetencyCtrl") {
					if (next.controller == "MainCtrl") {
						$rootScope.direction = "goingUp";
					} else {
						$rootScope.direction = "goingDown";
					}
				} else if (current.controller == "MainCtrl") {
					// from top level, always going down
					$rootScope.direction = "goingDown";
				}
			} else {
				$rootScope.direction = "goingDown";
				// no transition
			}
			*/
		});
		$rootScope.$on('$routeChangeSuccess', function(event, next, current) {
			console.log("$routeChangeSuccess: " + event);
		});
		$rootScope.$on('$locationChangeStart', function(event, toState) {
			console.log("$locationChangeStart: " + event);
		});
	});
	
	app.service('$dataService', function() {
		this.getData = function() {
			if (!this.data) {
				this.dataMap = {};
				var rawData = careerProfileData.competencies; // from external file loaded in index
				var idx = 0;
				var map = this.dataMap;
				angular.forEach(rawData, function(comp, key) {
					if (comp.image) {
						comp.style = {"background-image" : "url('images/" + comp.image + ".jpg')", 'pointer-events' : 'none'};
					} else if (comp.bgcolor) {
						comp.style = {"background-color" : comp.bgcolor, 'pointer-events' : 'none'};
					} else {
						comp.id = idx++;
						map[comp.id] = comp;
						var attrs = comp.attributes;
						var idx2 = 0;
						comp.attrMap = {};
						angular.forEach(attrs, function(attr, key) {
							if (attr.image) {
								attr.style = {"background-image" : "url('images/" + attr.image + ".jpg')", 'pointer-events' : 'none'};
							} else if (attr.bgcolor) {
								attr.style = {"background-color" : attr.bgcolor, 'pointer-events' : 'none'};
							} else {
								attr.id = idx2++;
								comp.attrMap[attr.id] = attr;
							}
						});
					}
				});
				this.data = rawData;
			}
			return this.data;
		};
		this.getComp = function(compId) {
			this.getData();
			return this.dataMap[compId];
		};
		this.getAttr = function(compId, attrId) {
			var comp = this.getComp(compId);
			return comp.attrMap[attrId];
		};
	});
	
	app.controller('RootCtrl', function($rootScope, $timeout, $location) {
		$scope = $rootScope;
		$scope.direction = "goingDown";
		$scope.initialized = false;
		
		this.onResetClick = function(event) {
			event.preventDefault();
			$rootScope.direction = "goingUp";
			$timeout(function() {
				$location.path("/competencies");
			}, 10);
		};
		
		$timeout(function() {
			$scope.initialized = true;
		}, 200);
	});
	
	app.controller('MainCtrl', function($rootScope, $scope, $location, $timeout, $dataService) {
		
		this.msg = "Competency message";
		
		this.comps = $dataService.getData();
		
		var l = this.comps.length;
		if (l > 8 && l <= 10) {
			this.layoutClass = '_10-up'; 
		} else if (l > 6 && l <=8) {
			this.layoutClass = '_8-up'; 
		} else if (l > 4 && l <=6) {
			this.layoutClass = '_6-up'; 
		} else {
			this.layoutClass = '_4-up'; 
		}
		
		this.onCompClick = function(event, comp) {
			event.preventDefault();
			if (comp.image || comp.bgcolor) {return;}
			$rootScope.direction = "goingDown";
			$timeout(function() {
				$location.path("/competencies/" + comp.id);
			}, 10);
		};
		
	});
	
	app.controller('CompetencyCtrl', function($scope, $routeParams, $rootScope, $location, $timeout, $dataService) {
		
		var compId = $routeParams.compId;
		var comp = $dataService.getComp(compId);
		this.msg = comp.name; 
		this.attrs = comp.attributes;
		
		var l = this.attrs.length;
		if (l > 8 && l <= 10) {
			this.layoutClass = '_10-up'; 
		} else if (l > 6 && l <=8) {
			this.layoutClass = '_8-up'; 
		} else if (l > 4 && l <=6) {
			this.layoutClass = '_6-up'; 
		} else {
			this.layoutClass = '_4-up'; 
		}
		
		this.onBackClick = function(event) {
			event.preventDefault();
			$rootScope.direction = "goingUp";
			$timeout(function() {
				$location.path("/competencies");
			}, 10);
		};
		
		this.onAttrClick = function(event, attr) {
			event.preventDefault();
			if (attr.image || attr.bgcolor) {return;}
			$rootScope.direction = "goingDown";
			$timeout(function() {
				$location.path("/competencies/" + $routeParams.compId + "/" + attr.id);
			}, 10);
		};
		
	});
	
	
	app.controller('AttributeCtrl', function($scope, $routeParams, $rootScope, $location, $timeout, $dataService) {
		
		var compId = $routeParams.compId;
		this.comp = $dataService.getComp(compId);
		var attrId = $routeParams.attrId;
		this.attr = $dataService.getAttr(compId, attrId);
		
		this.ddl = this.attr.ddl;
		
		this.onMainClick = function(event) {
			event.preventDefault();
			console.log("onMainClick: " + event);
			$rootScope.direction = "goingUp";
			$timeout(function() {
				$location.path("/competencies/");
			}, 10);
		};
		
		this.onCompClick = function(event) {
			event.preventDefault();
			console.log("onCompClick: " + event);
			$rootScope.direction = "goingUp";
			$timeout(function() {
				$location.path("/competencies/" + $routeParams.compId);
			}, 10);
		};
		
	});
	
		
})();
