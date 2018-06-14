<?php

if(isset($_POST["butTest"])){
    if (isset($_POST['g-recaptcha-response'])) {
        $url_to_google_api = "https://www.google.com/recaptcha/api/siteverify";

        $secret_key = '6LcgMFwUAAAAAMl3QMZ-k7Hwac7Gor3KK_IFb8DA';

        $query = $url_to_google_api . '?secret=' . $secret_key . '&response=' . $_POST['g-recaptcha-response'] . '&remoteip=' . $_SERVER['REMOTE_ADDR'];

        $data = json_decode(file_get_contents($query));

        if ($data->success) {
            echo('Вы прошли валидацию');
        }

        else {
            echo('Вы не прошли валидацию reCaptcha');
        }

    }

}
else {
    echo('Кнопка не нажата');
}


    
    $SITE_TITLE = 'DataCube';
    $SITE_DESCR = '';


    if ( isset($_POST) ) {
        $username = htmlspecialchars(trim($_POST['username']));
        $phone = htmlspecialchars(trim($_POST['tel']));
        $email = htmlspecialchars(trim($_POST['email']));

        $exp = $_POST['exp'];
        $university = $_POST['university'];
        $diploma = $_POST['diploma'];
        $skype = $_POST['skype'];
        $study = $_POST['study'];
        $questions = $_POST['questions'];

        $subject = $_POST['subject'] ? htmlspecialchars(trim($_POST['subject'])) : '';
        $comment = isset($_POST['comment']) ? htmlspecialchars(trim($_POST['comment'])) : '';
        $question = isset($_POST['questions']) ? htmlspecialchars(trim($_POST['questions'])) : '';
        $to = 'rudolifrudolif@gmail.com';


        $headers = "From: $SITE_TITLE \r\n";
        $headers .= "Reply-To: ". $email . "\r\n";
        $headers .= "Content-Type: text/html; charset=utf-8\r\n";

        $data = '<h1>'.$subject."</h1>";
        $data .= 'Имя: '.$username."<br>";
        $data .= 'Email: '.$email."<br>";
        $data .= 'Телефон: '.$phone."<br>";
        $data .= 'Скайп: '.$skype."<br>";
        $data .= 'Университет: '.$study."<br>";
        $data .= 'Вопрос: ' . $questions;

        // if ( $comment != '' ) {
        //     $data .= 'Комментарий: ' . $comment;
        // }
        // if ( $question != '' ) {
        //     $data .= 'Вопрос: ' . $question;
        // }

        $message = "<div style='background:#ccc;border-radius:10px;padding:20px;'>
                ".$data."
                <br>\n
                <hr>\n
                <br>\n
                <small>это сообщение было отправлено с сайта ".$SITE_TITLE." - ".$SITE_DESCR.", отвечать на него не надо</small>\n</div>";
        $send = mail($to, $subject, $message, $headers);

        if ( $send ) {
            echo '';
        } else {
                echo '<div class="error">Ошибка отправки формы</div>';
        }

    }
    else {
            echo '<div class="error">Ошибка, данные формы не переданы.</div>';
    }
    die();


    



    // require 'lib.php';

    // $secret = '6LeQxlkUAAAAAIcq1kOferrS0l2eO4q3fQDZ3WuK';
    // $response = null;
    // $reCaptcha = new ReCaptcha($secret);

    // if($_POST['g-recaptcha-response']) {
    //     $response = $reCaptcha->verifyResponse(
    //         $_SERVER["REMOTE_ADDR"],
    //         $_POST["g-recaptcha-response"]
    //     );
    //     $error = '';
    //     if($response != null && $response->success) {
    //         $SITE_TITLE = 'Infostudy';
    //         $SITE_DESCR = '';
    //         $name = $_POST['username'];
    //         $email = $_POST['email'];
    //         $phone = $_POST['tel'];
    //         $questions = $_POST['questions'];
    //         $exp = $_POST['exp'];
    //         $university = $_POST['university'];
    //         $diploma = $_POST['diploma'];
    //         $skype = $_POST['skype'];
    //         $english = $_POST['english'];
    //         $study = $_POST['study'];
    //         $subject = $_POST['subject'];
    //         $to = 'Elena357910@yandex.com';

    //         $headers = "From: " . "Infostudy" . "\r\n";
    //         $headers .= "Reply-To: ". $email . "\r\n";
    //         $headers .= "Content-Type: text/html; charset=utf-8\r\n";

    //         if($name) {$data .= 'Имя: '.$name."<br>";}
    //         if($email) {$data .= 'Email: '.$email."<br>";}
    //         if($questions) {$data .= 'Вопросы: '.$questions."<br>";}
    //         if($exp) {$data .= 'Опыт работы: '.$exp."<br>";}
    //         if($university) {$data .= 'Законченные ВУЗ(ы): '.$university."<br>";}
    //         if($diploma) {$data .= 'Специальность по диплому: '.$diploma."<br>";}
    //         if($skype) {$data .= 'Skype: '.$skype."<br>";}
    //         if($english) {$data .= 'Знание английского языка: '.$english."<br>";}
    //         if($study) {$data .= 'Полученное образование: '.$study."<br>";}
    //         $data .= 'Телефон: '.$phone."<br>";

    //         $message = "<div style='background:#ccc;border-radius:10px;padding:20px;'>
    //             ".$data."
    //             <br>\n
    //             <hr> \n
    //             <br>\n
    //             <small>это сообщение было отправлено с сайта ".$SITE_TITLE." - ".$SITE_DESCR.", отвечать на него не надо</small>\n</div>";
    //         $send = mail($to, $subject, $message, $headers);
    //     }
    //     else {
    //         echo "<p>ошибка</p>";
    //     }

    // }


	// if(isset($_POST)){
 //        $subject = 'Обращение на сайте Канадского образовательного эксперта';
	// 		$email = $_POST['email'];
	// 		$to = "Elena357910@yandex.com";

	// 		$headers = "From: " . "Infostudy" . "\r\n";
 //            $headers .= "Reply-To: ". $email . "\r\n";
 //            $headers .= "Content-Type: text/html; charset=utf-8\r\n";

 //            $message = "<div style='background:#ccc;border-radius:10px;padding:20px;'>
 //                <p>Здравствуйте!

	// 			Ваше обращение на сайте Канадского образовательного эксперта получено. 

	// 			В ближайшее время я с Вами свяжусь по указанной Вами контактной информации, чтобы обсудить Вашу ситуацию.

	// 			Благодарю за обращение.

	// 			С уважением,

	// 			Владимир Рудешко.</p>
 //                <br>\n
 //                <hr> \n
 //                <br>\n
 //                <small>это сообщение было отправлено с сайта ".$SITE_TITLE." - ".$SITE_DESCR.", отвечать на него не надо</small>\n</div>";
 //            $send = mail($to, $subject, $message, $headers);

 //            if($send){
 //                echo '';
 //            } else {
 //                echo '<div class="error">Ошибка отправки формы</div>';
 //            }

 //    } else {
 //        echo '<div class="error">Ошибка, данные формы не переданы.</div>';
 //    }
 //    die();
?>