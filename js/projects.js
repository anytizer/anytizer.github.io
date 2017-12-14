var projectsApp = angular.module("projectsApp", ["ngSanitize"]);

projectsApp.controller("HeaderController", function($scope){
	/**
	 * Did the visitor understand the project limitations?
	 */
	$scope.understood = false;
});

/**
 * @todo: Read HTML descriptions from file
 */
projectsApp.controller("ProjectsController", function($scope, $http) {
	/**
	 * @todo If small devices detected, restrict
	 */
	$scope.show = {
		"source": true,
		"demo": true,
		"buy": true,
		"donate": true,
		"learn": true,
	};
	
	/**
	 * List of useful projects
	 */
    $scope.projects = [
		{
			"name": "Gallery.HTML",
			"description": "",
			"completed": false,
			"links": {
				"desc": "projects/gallery.html/desc.html",
				"source": "https://github.com/anytizer/gallery.html/",
				"demo": "https://anytizer.github.io/demo/gallery.html/",
				"buy": "",
				"donate": "",
				"learn": "",
			},
		},
		{
			"name": "Cropnail.php",
			"description": "",
			"completed": true,
			"links": {
				"desc": "projects/cropnail.php/desc.html",
				"source": "https://github.com/anytizer/cropnail.php/",
				"demo": "",
				"buy": "",
				"donate": "",
				"learn": "",
			},
		},
		{
			"name": "APIUnit.phpunit",
			"description": "",
			"completed": true,
			"links": {
				"desc": "projects/apiunit.phpunit/desc.html",
				"source": "https://github.com/anytizer/apiunit.phpunit/",
				"demo": "",
				"buy": "",
				"donate": "",
				"learn": "",
			},
		},
		{
			"name": "DTO.php",
			"description": "",
			"completed": false,
			"links": {
				"desc": "projects/dto.php/desc.html",
				"source": "https://github.com/anytizer/dto.php/",
				"demo": "",
				"buy": "",
				"donate": "",
				"learn": "",
			},
		},
	];
	
	/**
	 * Description could be a very complex HTML to handwrite within json.
	 * Fetches descriptions externally
	 */
	angular.forEach($scope.projects, function(project, key){
		$http({
			method : "GET",
			url : project.links.desc
		}).then(function(response) {
			project.description = response.data;
		}, function(response) {
			// error
			project.description = "Description not found.";
		});
	}, null);
});

/**
 * Scroll the page to the top right after a link is clicked on
 */
projectsApp.run(function($rootScope, $anchorScroll){
    $rootScope.$on("$locationChangeSuccess", function(){
        $anchorScroll();
    });
});
