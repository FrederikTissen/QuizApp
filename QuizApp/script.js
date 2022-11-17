
let currentQuestion = 0;


function init() {
    document.getElementById('show-question-amount').innerHTML = questions.length;
    showQuestions();
}

function showQuestions(){
    let question = questions[currentQuestion];
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer1').innerHTML = question['answer_1'];
    document.getElementById('answer2').innerHTML = question['answer_2'];
    document.getElementById('answer3').innerHTML = question['answer_3'];
    document.getElementById('answer4').innerHTML = question['answer_4'];

}

function answer(selection){
let question = questions[currentQuestion];


console.log('Selected answer is ', selection)
let selectedQuestionNumber = selection.slice(-1)
console.log('Current qustion is ', question)

console.log('selectedQuestionNumber  is ', selectedQuestionNumber)
let idOfRigthAnswer = `answer${question['correctAnswer']}`;

if(selectedQuestionNumber == question['correctAnswer']) {
    document.getElementById(selection).parentNode.classList.add('bg-success');
}else {
    document.getElementById(selection).parentNode.classList.add('bg-danger');
    document.getElementById(idOfRigthAnswer).parentNode.classList.add('bg-success')
}
document.getElementById('next-button').disabled = false;
}