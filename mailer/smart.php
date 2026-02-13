<?php
header('Content-Type: application/json');

// Включение отладки ошибок (для тестирования)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.yandex.ru';
    $mail->SMTPAuth = true;
    $mail->Username = 'jyoung@yandex.ru';
    $mail->Password = 'yzsyscdrnurxzfac';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '';
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : 'Не указано';
    $agree = isset($_POST['agree']) ? true : false;

    // Валидация полей
    if (empty($phone)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Поле телефона обязательно']);
        exit;
    }

    $mail->setFrom('jyoung@yandex.ru', 'CHERY-Липецк');
    $mail->addAddress('igorrastrast@yandex.ru');
    $mail->isHTML(true);
    $mail->Subject = 'Форма с лендинга CHERY-Липецк';
    $mail->Body = 'Пользователь оставил данные <br> Имя: ' . $name . '<br> Номер телефона: ' . $phone;

    $logFile = '/var/www/u1842399/data/www/xn----7sbfcjcf9ayaqyed2au2ksb.xn--p1ai/logs/form_submissions.log';
    $logDir = dirname($logFile);

    if (!is_dir($logDir)) {
        mkdir($logDir, 0755, true);
    }

    if ($mail->send()) {
        $logMessage = sprintf(
            "[%s] Успешная отправка. Имя: %s, Телефон: %s\n",
            date('Y-m-d H:i:s'),
            htmlspecialchars($name),
            htmlspecialchars($phone)
        );
        file_put_contents($logFile, $logMessage, FILE_APPEND);
        echo json_encode(['success' => true, 'message' => 'Заявка отправлена']);
    } else {
        $logMessage = sprintf(
            "[%s] Ошибка отправки: %s. Имя: %s, Телефон: %s\n",
            date('Y-m-d H:i:s'),
            $mail->ErrorInfo,
            htmlspecialchars($name),
            htmlspecialchars($phone)
        );
        file_put_contents($logFile, $logMessage, FILE_APPEND);
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Ошибка отправки: ' . $mail->ErrorInfo]);
    }
} catch (Exception $e) {
    $logMessage = sprintf(
        "[%s] Ошибка PHPMailer: %s. Имя: %s, Телефон: %s\n",
        date('Y-m-d H:i:s'),
        $e->getMessage(),
        htmlspecialchars($name),
        htmlspecialchars($phone)
    );
    file_put_contents($logFile, $logMessage, FILE_APPEND);
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Ошибка PHPMailer: ' . $e->getMessage()]);
}
?>