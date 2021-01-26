<?php

$EMAIL_ID = 841486176; // 9-digit integer value (i.e., 123456789)
$API_KEY = "4b9e9d57"; // API key (string) provided by Open Movie DataBase (i.e., "ab123456")

session_start(); // Connect to the existing session

require_once '/home/common/php/dbInterface.php'; // Add database functionality
require_once '/home/common/php/mail.php'; // Add email functionality
require_once '/home/common/php/p4Functions.php'; // Add Project 4 base functions

processPageRequest(); // Call the processPageRequest() function

// DO NOT REMOVE OR MODIFY THE CODE OR PLACE YOUR CODE ABOVE THIS LINE

function addMovieToCart($imdbID)
{
	if (movieExistsInDB($imdbID) == 0) {
		$result= file_get_contents('http://www.omdbapi.com/?apikey='.$GLOBALS['API_KEY'].'&i='.$imdbID.'&type=movie&r=json');
		$movieInfo = json_decode($result, true);
		addMovie($movieInfo["imdbID"], $movieInfo["Title"], $movieInfo["Year"], $movieInfo["Rated"], $movieInfo["Runtime"], $movieInfo["Genre"], $movieInfo["Actors"], $movieInfo["Director"], $movieInfo["Writer"], $movieInfo["Plot"], $movieInfo["Poster"]);
	}
	addMovieToShoppingCart($_SESSION["userId"], movieExistsInDB($imdbID));
	displayCart();
}

function displayCart()
{
	$movies = getMoviesInCart($_SESSION["userId"]);
	require_once './templates/cart_form.html';
}

function processPageRequest()
{
	if (empty($_SESSION["displayName"])) {
		header("Location: logon.php");
	}
	elseif (empty($_GET['action'])) {
		displayCart();
	}
	elseif ($_GET['action'] == "add") {
		addMovieToCart($_GET['imdb_id']);
		displayCart();
	}
	elseif ($_GET['action'] == "remove") {
		removeMovieFromCart($_GET['movie_id']);
		displayCart();
	}
}

function removeMovieFromCart($movieID)
{	
	removeMovieFromShoppingCart($_SESSION["userId"], $movieID);
	displayCart();
}

?>