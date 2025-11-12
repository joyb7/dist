<?php
header('Content-Type: application/json');
include 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$password = $data['password'];

if (empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Please fill all fields.']);
    $conn->close();
    exit();
}

// ইমেইল দিয়ে ইউজারকে খোঁজা
$stmt = $conn->prepare("SELECT name, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($name, $hashed_password);
    $stmt->fetch();

    // পাসওয়ার্ড ভেরিফাই করা
    if (password_verify($password, $hashed_password)) {
        // পাসওয়ার্ড সঠিক
        echo json_encode(['success' => true, 'message' => 'Welcome back, ' . $name . '!']);
    } else {
        // পাসওয়ার্ড ভুল
        echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
    }
} else {
    // ইউজার পাওয়া যায়নি
    echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
}

$stmt->close();
$conn->close();
?>