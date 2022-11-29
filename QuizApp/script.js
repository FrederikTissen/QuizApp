
let currentQuestion = 0;
let rigthQuestions = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');
let AUDIO_APPLAUSE = new Audio('audio/applause.mp3');



function init() {
    document.getElementById('show-question-amount').innerHTML = questions.length;
    showQuestion();
    checkCategory();
}

//Show / Hide reset functions
function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressbar();
        updateToNextQuestion();
    }
}


function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none;';
    document.getElementById('question-amount-endScreen').innerHTML = questions.length;
    document.getElementById('amount-of-rigth-questions').innerHTML = rigthQuestions;
    AUDIO_APPLAUSE.play();
}


function resetAnswerButtons() {
    resetAnswerButton('answer1');
    resetAnswerButton('answer2');
    resetAnswerButton('answer3');
    resetAnswerButton('answer4');
}


function resetAnswerButton(id) {
    document.getElementById(`${id}`).parentNode.classList.remove('bg-danger');
    document.getElementById(`${id}`).parentNode.classList.remove('bg-success');
}


//Update functions
function updateProgressbar() {
    let percent = currentQuestion / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%;`;
}


function updateToNextQuestion() {
    let question = questions[currentQuestion];

    document.getElementById('show-current-question').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer1').innerHTML = question['answer_1'];
    document.getElementById('answer2').innerHTML = question['answer_2'];
    document.getElementById('answer3').innerHTML = question['answer_3'];
    document.getElementById('answer4').innerHTML = question['answer_4'];
}


//Selection functions
function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1)
    let idOfRigthAnswer = `answer${question['correctAnswer']}`;

    if (rigthAnswerSelected(selectedQuestionNumber, question)) {
        success(selection);
    } else {
        fail(idOfRigthAnswer, selection);
    }
    document.getElementById('next-button').disabled = false;
    disableAllAnswers();
}


function rigthAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['correctAnswer'];
}


function success(selection) {
    document.getElementById(selection).parentNode.classList.add('bg-success');
    rigthQuestions++;
    AUDIO_SUCCESS.play();
}


function fail(idOfRigthAnswer, selection){
    document.getElementById(selection).parentNode.classList.add('bg-danger');
    document.getElementById(idOfRigthAnswer).parentNode.classList.add('bg-success');
    AUDIO_FAIL.play();
}


//Button functions
function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
    checkCategory();
    enableAllAnswers();
}


function restartGame() {
    document.getElementById('endScreen').style = 'display: none;';
    document.getElementById('questionBody').style = '';
    currentQuestion = 0;
    rigthQuestions = 0;
    enableAllAnswers();
    init();
}


function gameIsOver() {
    return currentQuestion >= questions.length;
}


function enableAllAnswers(){
    document.getElementById('Answer1').disabled = false;
    document.getElementById('Answer2').disabled = false;
    document.getElementById('Answer3').disabled = false;
    document.getElementById('Answer4').disabled = false;
}


function disableAllAnswers() {
    document.getElementById('Answer1').disabled = true;
    document.getElementById('Answer2').disabled = true;
    document.getElementById('Answer3').disabled = true;
    document.getElementById('Answer4').disabled = true;
}


function checkCategory(){
    let question = questions[currentQuestion];
    deleteCategoryMark();

    generateCategoryMark(question, 'category-computer', 0);
    generateCategoryMark(question, 'category-internet', 1);
    generateCategoryMark(question, 'category-handy', 2);
    generateCategoryMark(question, 'category-software', 3);
}


function deleteCategoryMark(){
    document.getElementById('category-computer').innerHTML = '';
    document.getElementById('category-internet').innerHTML = '';
    document.getElementById('category-handy').innerHTML = '';
    document.getElementById('category-software').innerHTML = '';
}


function generateCategoryMark(question, id, category){
    if (question['category'] == category) {
        document.getElementById(id).innerHTML = '|';
    } 
}
