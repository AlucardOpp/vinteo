<?php
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once getcwd() . '/../PHPMailer/src/Exception.php';
require_once getcwd() . '/../PHPMailer/src/PHPMailer.php';
require_once getcwd() . '/../PHPMailer/src/SMTP.php';

$recipients = [
  'trapeznikovs@mail.ru',
  'trapeznikovmail@yandex.ru',
  'trapeznikov.sergey@gmail.com',
  'underquak3r@yandex.ru',
];

function sendSMTPMail($recipients, $subject, $body) {
  $from = 'underquak3r@yandex.ru';
  $pass = 'lecmdffponmksqot';

  foreach ($recipients as $to) {
    $mail = new PHPMailer;
    $mail->CharSet = 'UTF-8';

    // Настройки SMTP
    $mail->isSMTP();
    $mail->SMTPAuth = TRUE;
    $mail->SMTPDebug = 0;

    $mail->Host = 'ssl://smtp.yandex.ru';
    $mail->Port = 465;
    $mail->Username = $from;
    $mail->Password = $pass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;

    // От кого
    $mail->setFrom($from);

    // Кому
    $mail->addAddress($to);

    // Тема письма
    $mail->Subject = $subject;

    // Тело письма
    $mail->msgHTML($body);
    $mail->send();
  }
}

function sendMail($recipients, $subject, $body) {
  $body = str_replace('<br>', PHP_EOL, $body);
  $body = str_replace('<p>', '', $body);
  $body = str_replace('</p>', PHP_EOL . PHP_EOL, $body);

  $from = 'norely@vinteo.com';
  foreach ($recipients as $to) {
    $headers = 'From: ' . $from . "\r\n" .
      'Reply-To: ' . $from . "\r\n" .
      'X-Mailer: PHP/' . phpversion();
    mail($to, $subject, $body, $headers);
  }
}

function checkCaptcha($response) {
  $url = 'https://www.google.com/recaptcha/api/siteverify';
  $key = '6LeJfsseAAAAALzE0Wc5aH95vD1tWemDSs-BridK';
  $query = [
    'secret' => $key,
    'response' => $response,
    'remoteip' => $_SERVER['REMOTE_ADDR'],
  ];

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  curl_setopt($ch, CURLOPT_POST, TRUE);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $query);
  $data = json_decode(curl_exec($ch), $assoc = TRUE);
  curl_close($ch);

  return $data;
}


if (!empty($_POST)) {
  $result = ['success' => FALSE, 'form' => NULL];
  if (!empty($_POST['parent-class'])) {
    if (strpos($_POST['parent-class'], 'form--consulting') !== FALSE) {
      if (!empty($_POST['g-recaptcha-response'])) {
        $data = checkCaptcha($_POST['g-recaptcha-response']);
        if (!empty($data['success']) && $data['success']) {
          $subject = 'Запрос консультации по миграции на VINTEO ' . date('Y-m-d H:i:s');
          $body = '<p>Здравствуйте, уважаемые сотрудники VINTEO!<br>';
          $body .= 'Потенциальный клиент хочет получить консультацию. Вот его данные:<br>';
          $body .= 'ФИО: ' . (!empty($_POST['consult-user-name']) ? $_POST['consult-user-name'] : '-') . '<br>';
          $body .= 'Организация: ' . (!empty($_POST['consult-user-company']) ? $_POST['consult-user-company'] : '-') . '<br>';
          $body .= 'Должность: ' . (!empty($_POST['consult-user-position']) ? $_POST['consult-user-position'] : '-') . '<br>';
          $body .= 'E-mail: ' . (!empty($_POST['consult-user-email']) ? $_POST['consult-user-email'] : '-') . '<br>';
          $body .= 'Телефон: ' . (!empty($_POST['consult-user-phone']) ? $_POST['consult-user-phone'] : '-') . '<br>';
          $body .= 'Опишите задачу: ' . (!empty($_POST['consult-user-info']) ? $_POST['consult-user-info'] : '-') . '<br>';
          $body .= 'Пожалуйста, свяжитесь с ним как можно скорее!<br>';
          $body .= '</p>';
          $body .= '<p>С Уважением, душевный робот-информатор.</p>';
          sendMail($recipients, $subject, $body);
          $result['success'] = TRUE;
          $result['form'] = 'form--consulting';
        }
      }
    }
    if (strpos($_POST['parent-class'], 'form--faq') !== FALSE) {
      if (!empty($_POST['g-recaptcha-response'])) {
        $data = checkCaptcha($_POST['g-recaptcha-response']);
        if (!empty($data['success']) && $data['success']) {
          $subject = 'Вопрос по миграции на VINTEO ' . date('Y-m-d H:i:s');
          $body = '<p>Здравствуйте, уважаемые сотрудники VINTEO!<br>';
          $body .= 'Потенциальный клиент задаёт вопрос. Вот его данные:<br>';
          $body .= 'ФИО: ' . (!empty($_POST['faq-user-name']) ? $_POST['faq-user-name'] : '-') . '<br>';
          $body .= 'E-mail: ' . (!empty($_POST['faq-user-email']) ? $_POST['faq-user-email'] : '-') . '<br>';
          $body .= 'Телефон: ' . (!empty($_POST['faq-user-phone']) ? $_POST['faq-user-phone'] : '-') . '<br>';
          $body .= 'Вопрос: ' . (!empty($_POST['faq-user-info']) ? $_POST['faq-user-info'] : '-') . '<br>';
          $body .= 'Пожалуйста, свяжитесь с ним как можно скорее!<br>';
          $body .= '</p>';
          $body .= '<p>С Уважением, душевный робот-информатор.</p>';
          sendMail($recipients, $subject, $body);
          $result['success'] = TRUE;
          $result['form'] = 'form--faq';
        }
      }
    }
  }

  print json_encode($result);
  exit;

}
else {
  header('Location: /');
  exit;
}
