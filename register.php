<?php
header('Content-Type: application/json'); // রেসপন্স টাইপ JSON সেট করা
include 'db_connect.php';

// ইনপুট ডেটা JSON হিসেবে গ্রহণ করা
$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$email = $data['email'];
$password = $data['password'];

// বেসিক ভ্যালিডেশন
if (empty($name) || empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Please fill all fields.']);
    $conn->close();
    exit();
}

// ইমেইলটি আগে থেকেই আছে কিনা চেক করা
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Email already registered.']);
} else {
    // পাসওয়ার্ড হ্যাশ করা (খুবই গুরুত্বপূর্ণ)
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // নতুন ইউজার ডাটাবেসে ইনসার্ট করা
    $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $hashed_password);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Registration successful! You can now log in.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $stmt->error]);
    }
}

$stmt->close();
$conn->close();
?>