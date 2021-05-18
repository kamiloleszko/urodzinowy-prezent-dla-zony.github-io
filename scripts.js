var currentQuestion = 0;
var score = 0;
var askingQuestion = true;

function confirmFunction(){
    validateName();
    validateSurname();
    validateNickName();
    showModal();
}


function validateName(){
    var name = document.getElementById("name").value;
    if  (name.toLowerCase() !== "paulina"){
        $('#name-valid').text("Podano niepoprawne imię");
        document.getElementById('name').setAttribute("class","invalid form-control"); 
    } else{
        $('#name-valid').text("");
        document.getElementById('name').setAttribute("class","form-control"); 
    }
}


function validateSurname(){
    var surname = document.getElementById("surname").value;
    if  (surname.toLowerCase() !== "oleszko"){
        $('#surname-valid').text("Podano niepoprawne nazwisko");
        document.getElementById('surname').setAttribute("class","invalid form-control"); 
    } else{
        $('#surname-valid').text("");
        document.getElementById('surname').setAttribute("class","form-control"); 
    }
}

function validateNickName() {
    var nickName = document.getElementById("nickName").value;
    if  (nickName.toLowerCase() !== "szpachla"){
        $('#nickName-valid').text("Źle, tak na Ciebie wcale nie mówią :)");
        document.getElementById('nickName').setAttribute("class","invalid form-control"); 
    } else{
        $('#nickName-valid').text("");
        document.getElementById('nickName').setAttribute("class","form-control"); 
    }
}


function showModal(){
    if($('#surname-valid').text() == "" && $('#name-valid').text() == "" && $('#nickName-valid').text() == ""){
        loadQuestion();
        $('#exampleModalCenter').modal('toggle');
    }
}

function closeModal() {
    currentQuestion = 0;
    score = 0;
    askingQuestion = true;
    document.getElementById('explanation').innerHTML = "";
}

function playAgain() {
    currentQuestion = 0;
    score = 0;
    askingQuestion = true;
    document.getElementById('explanation').innerHTML = "";
    setNextQuestionButtonVisibility(true);
    setPlayAgainButtonVisible(false);
    setShowPrizeButtonVisible(false);
    loadQuestion();
   
}



var quiz = [
    {
        "question"		: 	"Q1: Czy masz dzisiaj urodziny",
        "choices"		: 	[
                                "TAK",
                                "NIE",
                                "NIE PAMIĘTAM"
                            ],
        "correct"		: 	"TAK",
        "explanation"	: 	"NO BEZ JAJ...",
        
    },
    {
        "question"		: 	"Q2: Czy byłaś grzeczna",
        "choices"		: 	[
                                "TAK",
                                "NIE",
                                "RELATYWNIE"
                            ],
        "correct"		: 	"RELATYWNIE",
        "explanation"	: 	"A kto niejednokrotnie dziamkał mężowi który sie bardzo stara??",
    },
    {
        "question"		: 	"Q3: Kto jest ideałem mężczyzny",
        "choices"		: 	[
                                "Ryan Gosling",
                                "Kamil Oleszko",
                                "David Beckham",
                                "Robert Pattinson",
                                "Jamie Dornan"
                            ],
        "correct"		: 	"Kamil Oleszko",
        "explanation"	: 	"Na pewno nie chcesz czasem dostać pstryczka w łeb? ;<",
    },
    {
        "question"		: 	"Q4: Czy zobowiązuje się być dalej dobrą i posłuszną małżonką",
        "choices"		: 	[
                                "TAK",
                                "NIE"
                            ],
        "correct"		: 	"TAK",
        "explanation"	: 	"To nici z prezentu :)",
    },

];




function loadQuestion(){
    
    //set temporary variable for creating radio buttons
    var radioButton;
    
    //clear out radio buttons from previous question
    document.getElementById('content').innerHTML = "";
    
    //loop through choices, and create radio buttons
    for(var i=0; i < quiz[currentQuestion]["choices"].length; i++){
        
        radioButton  = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.name = 'quiz';
        radioButton.id = 'choice'+ (i+1);
        radioButton.value = quiz[currentQuestion]["choices"][i];
        
        //create label tag, which hold the actual text of the choices
        var label = document.createElement('label');
        label.setAttribute('for','choice'+ (i+1));
        label.innerHTML = quiz[currentQuestion]["choices"][i];
        
        //create a <br> tag to separate options
        var br = document.createElement('br');
        
        //attach them to content. Attach br tag, then label, then radio button
        document.getElementById('content').insertBefore(br, null);
        document.getElementById('content').insertBefore(label, br);
        document.getElementById('content').insertBefore(radioButton, label);
    }
    
    //load the question
    document.getElementById('question').innerHTML = quiz[currentQuestion]["question"];
    
    //setup score for first time
    if(currentQuestion == 0){
        document.getElementById('score').innerHTML = '<p>wynik: 0 prawidłowych odpowiedzi na ' + quiz.length +' możliwe</p>';
    }
}

function checkAnswer(){
    
    //are we asking a question, or proceeding to next question?
    if(askingQuestion){
        
        //change button text to next question, so next time they click it, it goes to next question
        document.getElementById('check').innerHTML = 'Następne pytanie';
        askingQuestion = false;
        
        //determine which radio button they clicked
        var userpick;
        var correctIndex;
        var radios = document.getElementsByName('quiz');
        for(var i=0; i < radios.length; i++){
            if(radios[i].checked){ //if this radio button is checked
                userpick = radios[i].value;
            }
            //get index of correct answer
            if(radios[i].value == quiz[currentQuestion]["correct"]){
                correctIndex = i;
            }
        }
        
        //set the color if they got it right, or wrong
        if(userpick == quiz[currentQuestion]["correct"]){
            score++;
            document.getElementsByTagName('label')[correctIndex].style.color = "green";
            document.getElementsByTagName('label')[correctIndex].style.fontWeight = "bold";
            document.getElementById('explanation').innerHTML = "<h3>Świetna odpowiedź!</h3>";
        } else {
            document.getElementsByTagName('label')[correctIndex].style.color = "red";
            document.getElementsByTagName('label')[correctIndex].style.fontWeight = "bold";
            document.getElementById('explanation').innerHTML = "<h3>ŹLE :((((</h3>";
            document.getElementById('explanation').innerHTML += '<p>' + quiz[currentQuestion]["explanation"] + '</p>';
        }
        
        setUpScoreResults(score);
        
    } else { //reset form and move to next question

        //setting up so user can ask a question
        askingQuestion = true;
        
        //change button text back to 'submit answer'
        document.getElementById('check').innerHTML = 'Potwierdź odpowiedź';
        
        document.getElementById('explanation').innerHTML = "";
        
        //if we're not on last question, increase question number
        if(currentQuestion < quiz.length - 1){
            currentQuestion++;
            loadQuestion();
        } else {
            showFinalResults();
        }

    }
}

function setUpScoreResults(correctAnswers) {
    if(correctAnswers == 0) {
        document.getElementById('score').innerHTML = '<p>wynik: '+ score +' prawidłowych odpowiedzi na ' + quiz.length +' możliwe</p>';
    } else if  (correctAnswers == 1) {
        document.getElementById('score').innerHTML = '<p>wynik: '+ score +' prawidłowa odpowiedź na ' + quiz.length +' możliwe</p>';
    } else {
        document.getElementById('score').innerHTML = '<p>wynik: '+ score +' prawidłowe odpowiedzi na ' + quiz.length +' możliwe</p>';
    }
}

function showFinalResults(){
    
    document.getElementById('content').innerHTML = '<h2>Quiz ukończony</h2>';
    document.getElementById('content').innerHTML += '<p>Poniżej wynik quizu:</p>';
    document.getElementById('content').innerHTML += '<h2>' + score + ' na  ' + quiz.length + ' pytań, ' + Math.round(score/quiz.length * 100) + '%</h2>';
    
    setNextQuestionButtonVisibility(false);
    
    document.getElementById('question').innerHTML = "";
    setPlayAgainButtonVisible(true);
    if(score == quiz.length) {
        setShowPrizeButtonVisible(true);
    }
    



}

function setPlayAgainButtonVisible(isVisible) {
    if (isVisible) {
        document.getElementById('play-again-button').style.display = "block";
    } else {
        document.getElementById('play-again-button').style.display = "none";
    }
}

function setShowPrizeButtonVisible(isVisible) {
    if (isVisible) {
        document.getElementById('show-prize-button').style.display = "block";
    } else {
        document.getElementById('show-prize-button').style.display = "none";
    }
}

function setNextQuestionButtonVisibility(isVisible) {
    if (isVisible) {
        document.getElementById('check').style.display = "block";
    } else {
        document.getElementById('check').style.display = "none";
    }
}

function showPrize() {
    $('#prize-modal').modal('toggle');
}

window.onload = loadQuestion;



