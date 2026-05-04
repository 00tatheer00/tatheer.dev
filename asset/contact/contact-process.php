<?php

$address = 'tatheerabidi00@gmail.com';

if (!defined('PHP_EOL')) {
    define('PHP_EOL', "\r\n");
}

$error = false;
$fields = array('mail', 'phone', 'message');

foreach ($fields as $field) {
    if (empty($_POST[$field]) || trim($_POST[$field]) === '') {
        $error = true;
    }
}

if ($error) {
    http_response_code(400);
    echo 'ERROR!';
    exit;
}

$mail = stripslashes($_POST['mail']);
$phone = stripslashes($_POST['phone']);
$message = stripslashes($_POST['message']);

if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo 'ERROR!';
    exit;
}

$subject = 'Portfolio contact from ' . $mail;
$body = 'You received a message from your portfolio contact form.' . PHP_EOL . PHP_EOL;
$body .= 'Email: ' . $mail . PHP_EOL;
$body .= 'Phone: ' . $phone . PHP_EOL . PHP_EOL;
$body .= 'Message:' . PHP_EOL . $message . PHP_EOL;

$host = isset($_SERVER['HTTP_HOST']) ? preg_replace('/^www\./i', '', (string) $_SERVER['HTTP_HOST']) : 'localhost';
$fromMailbox = 'portfolio@' . $host;

$headers = array();
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: Portfolio <' . $fromMailbox . '>';
$headers[] = 'Reply-To: ' . $mail;

if (mail($address, $subject, $body, implode(PHP_EOL, $headers))) {
    echo 'Success';
} else {
    http_response_code(500);
    echo 'ERROR!';
}
