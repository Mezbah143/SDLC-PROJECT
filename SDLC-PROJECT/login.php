<?php
// Database connection details
$host = 'localhost';
$dbname = 'soccer_sense_db';
$dbuser = 'root';
$dbpassword = '11';

// Create connection
$conn = new mysqli($host, $dbuser, $dbpassword, $dbname);

// Check connection
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// Check if form data is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Prevent SQL injection
    $email = $conn->real_escape_string($email);
    $password = $conn->real_escape_string($password);

    // Query to check if the user exists
    $query = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        // User found
        echo "<script>alert('Login successful!'); window.location.href='dashboard.html';</script>";
    } else {
        // Invalid credentials
        echo "<script>alert('Invalid email or password'); window.history.back();</script>";
    }
}

$conn->close();
?>
