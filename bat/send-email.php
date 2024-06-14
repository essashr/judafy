<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    
    if ($email) {
        $to = 'seuemail@exemplo.com';  // Substitua pelo seu e-mail
        $subject = 'Novo e-mail inserido na lista';
        $message = 'E-mail inserido na lista: ' . $email;
        $headers = 'From: webmaster@seusite.com' . "\r\n" .
                   'Reply-To: webmaster@seusite.com' . "\r\n" .
                   'X-Mailer: PHP/' . phpversion();

        if (mail($to, $subject, $message, $headers)) {
            echo 'E-mail enviado com sucesso!';
        } else {
            echo 'Falha ao enviar o e-mail.';
        }
    } else {
        echo 'Endereço de e-mail inválido.';
    }
}
?>
