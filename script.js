//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
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
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
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
}

// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span class="que">'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option" id ="opciona" data-indexoption="'+ index + "-"+ 0 +'"><span class="que">'+ questions[index].options[0] +'</span></div>'
    + '<div class="option" id ="opcionb" data-indexoption="'+ index + "-"+ 1 +'"><span class="que">'+ questions[index].options[1] +'</span></div>'
    + '<div class="option" id ="opcionc" data-indexoption="'+ index + "-"+ 2 +'"><span class="que">'+ questions[index].options[2] +'</span></div>'
    + '<div class="option" id ="opciond" data-indexoption="'+ index + "-"+ 3 +'"><span class="que">'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");
    // se agrega un id a la lista de opciones
    option_list.setAttribute('id', 'opciones');
    
    // set onclick attribute to all available options optionSelected(this)
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    
    }
    
    // acceso al data-indexOption que relaciona los indices de las preguntas con sus respectivas opciones
    var questIndexOption = document.getElementById('opciones');
    const opta = questIndexOption.dataset.indexoption = questions[index].options;
    console.log(opta);

}

// Accion onclick para seleccionar la opcion a de cada pregunta
function selectOptiona(){
    var questsOptiona = document.getElementById('opciona');
    var questsOptionb = document.getElementById('opcionb');
    var questsOptionc = document.getElementById('opcionc');
    var questsOptiond = document.getElementById('opciond');
     
    questsOptiona.style.display="block";
    questsOptionb.style.display="none";
    questsOptionc.style.display="none";
    questsOptiond.style.display="none";
    // accion onclick que selecciona la opcion a demandada
    questsOptiona.onclick();
    // accedemos al conjunto de datos del parametro index option
    const opciona = questsOptiona.dataset.indexoption;
    console.log('seleccionaste la opcion: ', opciona);
    console.log(questsOptiona);
    
    
}
   
// Accion onclick para volver a mostrar el inciso a de cada pregunta
function showOptiona(){
    // var questsOptiona = document.getElementById('opciona');
    var questsOptionb = document.getElementById('opcionb');
    var questsOptionc = document.getElementById('opcionc');
    var questsOptiond = document.getElementById('opciond');
    
    // questsOptiona.style.display="none";
    questsOptionb.style.display="block";
    questsOptionc.style.display="block";
    questsOptiond.style.display="block";
}

// Accion onclick para seleccionar la opcion b de cada pregunta
function selectOptionb(){
    var questsOptiona = document.getElementById('opciona');
    var questsOptionb = document.getElementById('opcionb');
    var questsOptionc = document.getElementById('opcionc');
    var questsOptiond = document.getElementById('opciond');
    
    questsOptiona.style.display="none";
    questsOptionb.style.display="block";
    questsOptionc.style.display="none";
    questsOptiond.style.display="none";
    // accion onclick que selecciona la opcion b demandada
    questsOptionb.onclick();

    const opcionb = questsOptionb.dataset.indexoption;
    console.log('seleccionaste la opcion: ', opcionb);
    console.log(questsOptionb);
    
}
// Accion onclick para volver a mostrar el inciso b de cada pregunta
function showOptionb(){
    var questsOptiona = document.getElementById('opciona');
    var questsOptionc = document.getElementById('opcionc');
    var questsOptiond = document.getElementById('opciond');
    
    questsOptiona.style.display="block";
    questsOptionc.style.display="block";
    questsOptiond.style.display="block";
}

// Accion onclick para seleccionar la opcion c de cada pregunta
function selectOptionc(){
    var questsOptiona = document.getElementById('opciona');
    var questsOptionb = document.getElementById('opcionb');
    var questsOptionc = document.getElementById('opcionc');
    var questsOptiond = document.getElementById('opciond');

    questsOptiona.style.display="none";
    questsOptionb.style.display="none";
    questsOptionc.style.display="block";
    questsOptiond.style.display="none";
    // accion onclick que selecciona la opcion c demandada
    questsOptionc.onclick();

    const opcionc = questsOptionc.dataset.indexoption;
    console.log('seleccionaste la opcion: ', opcionc);
    console.log(questsOptionc);
    
}
// Accion onclick para volver a mostrar el inciso c de cada pregunta
function showOptionc(){
    var questsOptiona = document.getElementById('opciona');
    var questsOptionb = document.getElementById('opcionb');
    var questsOptiond = document.getElementById('opciond');
    
    questsOptiona.style.display="block";
    questsOptionb.style.display="block";
    questsOptiond.style.display="block";
}

// Accion onclick para seleccionar la opcion d de cada pregunta
function selectOptiond(){
    var questsOptiona = document.getElementById('opciona');
    var questsOptionb = document.getElementById('opcionb');
    var questsOptionc = document.getElementById('opcionc');
    var questsOptiond = document.getElementById('opciond');

    questsOptiona.style.display="none";
    questsOptionb.style.display="none";
    questsOptionc.style.display="none";
    questsOptiond.style.display="block";
    // accion onclick que selecciona la opcion d demandada
    questsOptiond.onclick();

    const opciond = questsOptiond.dataset.indexoption;
    console.log('seleccionaste la opcion: ', opciond)
    console.log(questsOptiond);
}

// Accion onclick para volver a mostrar el inciso d de cada pregunta
function showOptiond(){
    var questsOptiona = document.getElementById('opciona');
    var questsOptionb = document.getElementById('opcionb');
    var questsOptionc = document.getElementById('opcionc');
    
    questsOptiona.style.display="block";
    questsOptionb.style.display="block";
    questsOptionc.style.display="block";
}


// funcion para activar el boton de ayuda
function helpMe(){
    var helpMebutton = document.getElementById('help');
    // helpMebutton.style.display='block';
    console.log(helpMebutton);
    // helpMebutton.onclick();
}

// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

// funcion que muestra los resultados 
function showResult(){
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
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Tiempo"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> de <p>'+ questions.length +'</p> Preguntas</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}