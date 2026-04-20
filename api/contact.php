<?php

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed.',
    ]);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$subject = trim($input['subject'] ?? '');
$message = trim($input['message'] ?? '');

if ($name === '' || $email === '' || $subject === '' || $message === '') {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'All fields are required.',
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Please provide a valid email address.',
    ]);
    exit;
}

$to = 'osmanosmani@gmail.com';
$safeSubject = 'Portfolio Contact: ' . preg_replace("/[\r\n]+/", ' ', $subject);
$safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safeEmail = filter_var($email, FILTER_SANITIZE_EMAIL);

$emailBody = "Name: {$safeName}\n";
$emailBody .= "Email: {$safeEmail}\n";
$emailBody .= "Subject: {$subject}\n\n";
$emailBody .= $message . "\n";

$headers = [
    'From: ' . $safeEmail,
    'Reply-To: ' . $safeEmail,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = @mail($to, $safeSubject, $emailBody, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Message could not be sent. Check your local mail/SMTP configuration in WAMP.',
    ]);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Message sent successfully.',
]);
