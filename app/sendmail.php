<?php
    require 'lib.php';

    $secret = '6LeQxlkUAAAAAIcq1kOferrS0l2eO4q3fQDZ3WuK';
    $response = null;
    $reCaptcha = new ReCaptcha($secret);

    if($_POST['g-recaptcha-response']) {
        $response = $reCaptcha->verifyResponse(
            $_SERVER["REMOTE_ADDR"],
            $_POST["g-recaptcha-response"]
        );
        $error = '';
        if($response != null && $response->success) {
            $SITE_TITLE = 'Infostudy';
            $SITE_DESCR = '';
            $name = $_POST['username'];
            $email = $_POST['email'];
            $phone = $_POST['tel'];
            $questions = $_POST['questions'];
            $exp = $_POST['exp'];
            $university = $_POST['university'];
            $diploma = $_POST['diploma'];
            $skype = $_POST['skype'];
            $english = $_POST['english'];
            $study = $_POST['study'];
            $subject = $_POST['subject'];
            $to = 'canada@infostudymail.com';

            $headers = "From: " . "Infostudy" . "\r\n";
            $headers .= "Reply-To: ". $email . "\r\n";
            $headers .= "Content-Type: text/html; charset=utf-8\r\n";

            if($name) {$data .= 'Имя: '.$name."<br>";}
            if($email) {$data .= 'Email: '.$email."<br>";}
            if($questions) {$data .= 'Вопросы: '.$questions."<br>";}
            if($exp) {$data .= 'Опыт работы: '.$exp."<br>";}
            if($university) {$data .= 'Законченные ВУЗ(ы): '.$university."<br>";}
            if($diploma) {$data .= 'Специальность по диплому: '.$diploma."<br>";}
            if($skype) {$data .= 'Skype: '.$skype."<br>";}
            if($english) {$data .= 'Знание английского языка: '.$english."<br>";}
            if($study) {$data .= 'Полученное образование: '.$study."<br>";}
            $data .= 'Телефон: '.$phone."<br>";

            $message = "<div style='background:#ccc;border-radius:10px;padding:20px;'>
                ".$data."
                <br>\n
                <hr> \n
                <br>\n
                <small>это сообщение было отправлено с сайта ".$SITE_TITLE." - ".$SITE_DESCR.", отвечать на него не надо</small>\n</div>";
            $send = mail($to, $subject, $message, $headers);
        }

    }


	if(isset($_POST)){
        $subject = 'Обращение на сайте Канадского образовательного эксперта';
			$email = $_POST['email'];
			$to = $email;

			$headers = "From: " . "Infostudy" . "\r\n";
            $headers .= "Reply-To: ". "max.grinchyk@gmail.com" . "\r\n";
            $headers .= "Content-Type: text/html; charset=utf-8\r\n";

            $message = "<div style='background:#ccc;border-radius:10px;padding:20px;'>
                <p>Здравствуйте!

				Ваше обращение на сайте Канадского образовательного эксперта получено. 

				В ближайшее время я с Вами свяжусь по указанной Вами контактной информации, чтобы обсудить Вашу ситуацию.

				Благодарю за обращение.

				С уважением,

				Владимир Рудешко.</p>
                <br>\n
                <hr> \n
                <br>\n
                <small>это сообщение было отправлено с сайта ".$SITE_TITLE." - ".$SITE_DESCR.", отвечать на него не надо</small>\n</div>";
            $send = mail($to, $subject, $message, $headers);

            if($send){
                echo '';
            } else {
                echo '<div class="error">Ошибка отправки формы</div>';
            }

    } else {
        echo '<div class="error">Ошибка, данные формы не переданы.</div>';
    }
    die();
?>