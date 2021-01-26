<?php

$API_KEY = "4b9e9d57"; // API key (string) provided by Open Movie DataBase (i.e., "ab123456")

session_start(); // Connect to the existing session

processPageRequest(); // Call the processPageRequest() function

// DO NOT REMOVE OR MODIFY THE CODE OR PLACE YOUR CODE ABOVE THIS LINE

function displaySearchForm()
{
	require_once './templates/search_form.html';
}

function displaySearchResults($searchString)
{	
	$results = file_get_contents('http://www.omdbapi.com/?apikey='.$GLOBALS['API_KEY'].'&s='.urlencode($searchString).'&type=movie&r=json');
	$resultsArray = json_decode($results, true)["Search"];
	require_once './templates/results_form.html';
}

function processPageRequest()
{
	if (empty($_SESSION["displayName"])) {
		header("Location: logon.php");
	}
	if (empty($_POST) || empty($_POST['keyword'])) {
		displaySearchForm();
	}
	else {
		displaySearchResults($_POST['keyword']);
	}
}

?>