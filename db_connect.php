<?php
$servername = "localhost";
$username = "root"; // XAMPP-এর ডিফল্ট ইউজারনেম
$password = "";     // XAMPP-এর ডিফল্ট পাসওয়ার্ড (খালি)
$dbname = "user_db"; // আপনার তৈরি করা ডাটাবেসের নাম

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>