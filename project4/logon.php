<?php

$EMAIL_ID = 841486176; // 9-digit integer value (i.e., 123456789)

require_once '/home/common/php/dbInterface.php'; // Add database functionality
require_once '/home/common/php/mail.php'; // Add email functionality
require_once '/home/common/php/p4Functions.php'; // Add Project 4 base functions

processPageRequest(); // Call the processPageRequest() function

// DO NOT REMOVE OR MODIFY THE CODE OR PLACE YOUR CODE ABOVE THIS LINE

function authenticateUser($username, $password) 
{
	if (is_null(validateUser($username, $password))) {
		return false;
	}
	session_start();
	$_SESSION["userId"] = validateUser($username, $password)[0];
	$_SESSION["displayName"] = validateUser($username, $password)[1];
	$_SESSION["emailAddress"] = validateUser($username, $password)[2];
	return true;
}

function displayLoginForm($message = "")
{
	require_once './templates/logon_form.html';
}

function processPageRequest()
{
	// DO NOT REMOVE OR MODIFY THE CODE OR PLACE YOUR CODE BELOW THIS LINE
	if(session_status() == PHP_SESSION_ACTIVE)
	{
		session_destroy();
	}
	// DO NOT REMOVE OR MODIFY THE CODE OR PLACE YOUR CODE ABOVE THIS LINE
	if (empty($_POST)) {
		displayLoginForm();
	}
	if (isset($_POST['action'])) {
		if ($_POST['action'] == "login") {
			if (authenticateUser($_POST["user"], $_POST["pass"])) {
				header("Location: index.php");
			}
			else {
				displayLoginForm("Error! Invalid username and/or password!");
			}
		}
	}
}

?>
