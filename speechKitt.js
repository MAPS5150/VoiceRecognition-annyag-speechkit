if (annyang) {
    // Add our commands to annyang
    annyang.addCommands({
        'hola': function() { 
            alert('¡Hola, buen dia amig@!'); 
        },
        'iniciar evaluación':function(){
            console.log('iniciar evaluación');
            info_box.classList.add("activeInfo");
        },
        'salir':function(){
            console.log('salir de la evaluacion');
            info_box.classList.remove("activeInfo"); //hide info box
        },
        'continuar':function(){
            console.log('continuar');
            info_box.classList.remove("activeInfo"); //hide info box
            quiz_box.classList.add("activeQuiz"); //show quiz box
            showQuetions(0); //calling showQestions function
            queCounter(1); //passing 1 parameter to queCounter
            startTimer(15); //calling startTimer function
            startTimerLine(0); //calling startTimerLine function
            const items = document.getElementsByClassName("que");
            for (let index = 0; index < items.length; index++) {
                    decir(items[index].innerHTML);    
            }
        },
        'siguiente pregunta':function(){
            console.log('siguiente');
            if(que_count < questions.length - 1){ //if question count is less than total question length
                que_count++; //increment the que_count value
                que_numb++; //increment the que_numb value
                showQuetions(que_count); //calling showQestions function
                queCounter(que_numb); //passing que_numb value to queCounter
                clearInterval(counter); //clear counter
                clearInterval(counterLine); //clear counterLine
                startTimer(timeValue); //calling startTimer function
                startTimerLine(widthValue); //calling startTimerLine function
                timeText.textContent = "Time Left"; //change the timeText to Time Left
                next_btn.classList.remove("show"); //hide the next button
            }else{
                clearInterval(counter); //clear counter
                clearInterval(counterLine); //clear counterLine
                showResult(); //calling showResult function
            }
            const items = document.getElementsByClassName("que");
            for (let index = 0; index < items.length; index++) {
                    decir(items[index].innerHTML);    
            }
        },
        'resultados':function(){
            console.log('resultados');
            info_box.classList.remove("activeInfo"); //hide info box
            quiz_box.classList.remove("activeQuiz"); //hide quiz box
            result_box.classList.add("activeResult"); //show result box
            const scoreText = result_box.querySelector(".score_text");
            if (userScore > 3){ // if user scored more than 3
                //creating a new span tag and passing the user score number and total question number
                let scoreTag = '<span>y felicidades! 🎉, tuviste:'+  userScore +' respuestas correctas de: '+ questions.length +'</span>';
                scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
            }
            else if(userScore > 1){ // if user scored more than 1
                let scoreTag = '<span>y muy bien😎,  tuviste: '+ userScore +'respuestas correctas de: '+ questions.length +'</span>';
                scoreText.innerHTML = scoreTag;
            }
            else{ // if user scored less than 1
                let scoreTag = '<span> y lo sentimos 😐, solo tuviste:'+ userScore +'respuestas correctas de:'+ questions.length +'</span>';
                scoreText.innerHTML = scoreTag;
            }
        },
        'contestar nuevamente':function(){
            console.log('contestar nuevamente');
            quiz_box.classList.add("activeQuiz"); //show quiz box
            result_box.classList.remove("activeResult"); //hide result box
            timeValue = 15; 
            que_count = 0;
            que_numb = 1;
            userScore = 0;
            widthValue = 0;
            showQuetions(que_count); //calling showQestions function
            queCounter(que_numb); //passing que_numb value to queCounter
            clearInterval(counter); //clear counter
            clearInterval(counterLine); //clear counterLine
            startTimer(timeValue); //calling startTimer function
            startTimerLine(widthValue); //calling startTimerLine function
            timeText.textContent = "Time Left"; //change the text of timeText to Time Left
            next_btn.classList.remove("show"); //hide the next button
            const items = document.getElementsByClassName("que");
            for (let index = 0; index < items.length; index++) {
                    decir(items[index].innerHTML);    
            }
        },
        'salir':function(){
            console.log('salir');
            window.location.reload(); //reload the current window
        },
        'seleccionar el inciso a':function(){
            selectOptiona();
        },
        'corregir':function(){
            reloadQuestions();
        },
        'seleccionar el inciso b':function(){
            selectOptionb();
        },
        'seleccionar el inciso c':function(){
            selectOptionc();
        },
        'seleccionar el inciso de':function(){
            selectOptiond();
        },
        'ayuda':function(){
            
        },
    });
    annyang.setLanguage("es-MX");
    // annyang.start();

    // sintetizador de texto a voz
    var checkbox = document.getElementById('input');
    checkbox.addEventListener("change", validaCheckbox, false);
    function validaCheckbox()
    {
    var checked = checkbox.checked;
    if(checked){
        const items = document.getElementsByClassName("info");
    for (let index = 0; index < items.length; index++) {
        decir(items[index].innerHTML);    
    }
    }
    }

    function decir(texto){
        const recorder = speechSynthesis.speak(new SpeechSynthesisUtterance(texto));
        recorder.lang = 'es-MX';
    }

    // Tell KITT to use annyang
    SpeechKITT.annyang();

    // Define a stylesheet for KITT to use
    SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/1.0.0/themes/flat-pomegranate.css');

    // Texto de bienvenida. Se muestra cuando se activa el microfono
    stringTitle = '¡Hola amig@!';
    SpeechKITT.setInstructionsText(stringTitle);

    // comandos que el speech voice reconoce
    array1 = [' Bienvenid@'];
    SpeechKITT.setSampleCommands(array1);

    // Render KITT's interface
    SpeechKITT.vroom();
    }