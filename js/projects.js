var projectsApp = angular.module("projectsApp", ["ngSanitize"]);

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
		"buy": false,
		"donate": true,
		"learn": false,
	};
	
	/**
	 * List of useful projects
	 */
    $scope.projects = [
		{
			"name": "Gallery.HTML",
			"description": "",
			"links": {
				"desc": "projects/gallery.html/desc.html",
				"source": "https://github.com/anytizer/gallery.html",
				"demo": "",
				"buy": "",
				"donate": "",
				"learn": "",
			},
		},
		{
			"name": "Cropnail.php",
			"description": "",
			"links": {
				"desc": "projects/cropnail.php/desc.html",
				"source": "https://github.com/anytizer/cropnail.php",
				"demo": "",
				"buy": "",
				"donate": "",
				"learn": "",
			},
		},
		{
			"name": "APIUnit.phpunit",
			"description": "",
			"links": {
				"desc": "projects/apiunit.phpunit/desc.html",
				"source": "https://github.com/anytizer/apiunit.phpunit",
				"demo": "",
				"buy": "",
				"donate": "",
				"learn": "",
			},
		},
		{
			"name": "DTO.php",
			"description": "",
			"links": {
				"desc": "projects/dto.php/desc.html",
				"source": "https://github.com/anytizer/dto.phpunit",
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
			method : "POST",
			url : project.links.desc
		}).then(function(response) {
			project.description = response.data;
		}, function(response) {
			// error
			project.description = "Description not found.";
		});
	}, null);
});