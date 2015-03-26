<!DOCTYPE html>
<html ng-app="careerProfilesApp" ng-controller="RootCtrl as root">
	<head>
		<?php
			echo "<base href=\"" . $_SERVER['REQUEST_URI'] . "\"/>";
		?>
		
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

		<title>Career Profiles</title>
		
		<link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,400,700' rel='stylesheet' type='text/css'>
		<link href="css/vendor/bootstrap.css" rel="stylesheet" />
		<link href="css/main.css" rel="stylesheet" />

		<!-- <script src="js/vendor/angular.min.js.map"></script> -->
		<script src="js/vendor/angular.min.js"></script>
		<script src="js/vendor/angular-route.js"></script>
		<script src="js/vendor/angular-animate.js"></script>
		<script src="js/vendor/angular-touch.js"></script>
		<script src="js/vendor/ui-bootstrap-tpls-0.12.0.js"></script> <!-- Do not replace; code is modified -->
		<script src="js/vendor/kinetic-v5.1.0.min.js"></script>
		<script src="data/career_profile_dataLTS.js" type="text/javascript"></script>
		<script src="js/careerProfilesApp.js" type="text/javascript"></script>

	</head>
	<body>
		<div id="wrapper" class="{{direction}}">
			<p class="loading">LOADING...</p>
			<div class="container reveal-animation" ng-view ng-show="initialized"></div>
			<a id="resetButton" ng-click="root.onResetClick($event)">RESET</a>
		</div>
		<!-- <div class="hGuidelines">
			<div class="vGuidelines"></div>
		</div> -->	
		</body>
</html>
