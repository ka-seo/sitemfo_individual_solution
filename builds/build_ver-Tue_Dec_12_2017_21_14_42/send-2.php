<?php

	if(!empty($_POST['username'])) $name = $_POST['username'];
    if(!empty($_POST['phone'])) $phone = $_POST['phone'];
    if(!empty($_POST['email'])) $email = $_POST['email'];
    
    $data = array(
    	'name' => $name,
    	'phone' => $phone,
    	'email' => $email,
    );

    if($data['name'] != '' && $data['phone'] != '') {
    	// Формируем сообщение, отправляемое на почту
    	$message = "<div>";
    	$message .= "<p><strong>Имя:</strong> ".$data['name']."</p>";
    	$message .= "<p><strong>Телефон:</strong> <a href='tel:".$data['phone']."'>".$data['phone']."</a></p>";
    	$message .= "<p><strong>E-mail:</strong> ".$data['email']."</p>";
    	$message .= "</div>"; 

 		// Задаем получателя письма
		$to = 'ka-seo@ya.ru';
	    
	    // От кого пришло письмо
		$from = "noreply@kaseo.ru";
	    
	    // Задаем тему письма
		$subject = "Заявка на сайт для МКК"; 
	    
		// Формируем заголовок письма (при неправильном формировании может ломаться кодировка и т.д.)
		$headers = "From: $from\r\nReply-To: $to\r\nContent-type: text/html; charset=utf-8\r\n"; 
		
	    if (mail($to, $subject, $message, $headers)) { 
	    	// При помощи функции mail, отправляем сообщение, проверяя отправилось оно или нет
			echo 'success'; // Отправка успешна
		}
		else {
			echo 'error'; // Письмо не отправилось
		}
    }
    else {
    	echo 'Not sent';
    	//print_r($data);
    }
?>