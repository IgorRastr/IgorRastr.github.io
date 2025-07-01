<?php
header('Content-Type: application/json');

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'igorrastr@gmail.com';
    $mail->Password = 'uudv ifkk anhz mpuo';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '';
    $agree = isset($_POST['agree']) ? true : false;

    // Валидация полей
    if (empty($phone)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Поле телефона обязательно']);
        exit;
    }

    // if (!$agree) {
    //     http_response_code(400);
    //     echo json_encode(['success' => false, 'message' => 'Необходимо согласиться с условиями']);
    //     exit;
    // }

    $mail->setFrom('igorrastr@gmail.com', 'Marina-900');
    $mail->addAddress('jyoung@yandex.ru');
    $mail->isHTML(true);
    $mail->Subject = 'Форма с лендинга Катера (Акция)';
    $mail->Body = 'Пользователь оставил данные <br> Номер телефона: ' . $phone;

    if ($mail->send()) {
        echo json_encode(['success' => true, 'message' => 'Заявка отправлена']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Ошибка отправки: ' . $mail->ErrorInfo]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Ошибка PHPMailer: ' . $e->getMessage()]);
}
?>