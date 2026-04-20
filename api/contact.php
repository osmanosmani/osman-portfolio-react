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

$configPath = __DIR__ . '/config.php';

if (!file_exists($configPath)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Mail configuration file is missing.',
    ]);
    exit;
}

$config = require $configPath;

function smtpRead($socket)
{
    $response = '';

    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;

        if (preg_match('/^\d{3}\s/', $line)) {
            break;
        }
    }

    return $response;
}

function smtpExpect($socket, array $allowedCodes)
{
    $response = smtpRead($socket);
    $code = (int) substr($response, 0, 3);

    if (!in_array($code, $allowedCodes, true)) {
        throw new RuntimeException(trim($response) ?: 'Unexpected SMTP response.');
    }

    return $response;
}

function smtpCommand($socket, $command, array $allowedCodes)
{
    fwrite($socket, $command . "\r\n");
    return smtpExpect($socket, $allowedCodes);
}

function sendSmtpMail(array $config, $replyToEmail, $replyToName, $subject, $body)
{
    $transport = ($config['smtp_secure'] ?? '') === 'ssl' ? 'ssl://' : '';
    $remote = $transport . $config['smtp_host'] . ':' . $config['smtp_port'];

    $socket = stream_socket_client($remote, $errno, $errstr, 30);

    if (!$socket) {
        throw new RuntimeException("SMTP connection failed: {$errstr} ({$errno})");
    }

    stream_set_timeout($socket, 30);

    try {
        smtpExpect($socket, [220]);
        smtpCommand($socket, 'EHLO osmanosmani.se', [250]);
        smtpCommand($socket, 'AUTH LOGIN', [334]);
        smtpCommand($socket, base64_encode($config['smtp_username']), [334]);
        smtpCommand($socket, base64_encode($config['smtp_password']), [235]);
        smtpCommand($socket, 'MAIL FROM:<' . $config['from_email'] . '>', [250]);
        smtpCommand($socket, 'RCPT TO:<' . $config['to_email'] . '>', [250, 251]);
        smtpCommand($socket, 'DATA', [354]);

        $headers = [
            'From: ' . $config['from_name'] . ' <' . $config['from_email'] . '>',
            'Reply-To: ' . $replyToName . ' <' . $replyToEmail . '>',
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
        ];

        $messageData = implode("\r\n", $headers) . "\r\n";
        $messageData .= 'Subject: ' . $subject . "\r\n\r\n";
        $messageData .= preg_replace("/(?m)^\./", '..', $body) . "\r\n.\r\n";

        fwrite($socket, $messageData);
        smtpExpect($socket, [250]);
        smtpCommand($socket, 'QUIT', [221]);
    } finally {
        fclose($socket);
    }
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

$safeSubject = 'Portfolio Contact: ' . preg_replace("/[\r\n]+/", ' ', $subject);
$safeName = trim(preg_replace('/\s+/', ' ', $name));
$safeEmail = filter_var($email, FILTER_SANITIZE_EMAIL);

$emailBody = "Name: {$safeName}\n";
$emailBody .= "Email: {$safeEmail}\n";
$emailBody .= "Subject: {$subject}\n\n";
$emailBody .= $message . "\n";

try {
    sendSmtpMail($config, $safeEmail, $safeName, $safeSubject, $emailBody);

    echo json_encode([
        'success' => true,
        'message' => 'Message sent successfully.',
    ]);
} catch (Throwable $exception) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Message could not be sent. Please verify SMTP settings on the server.',
    ]);
}
