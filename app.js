const questions=[
    {
        question:"Which of the following keywords is used to define a variable in Javascript?",
        answer:[
            {test:"var",correct:"false"},
            {test:"let",correct:"false"},
            {test:"A and B",correct:"true"},
            {test:"None",correct:"fase"},       
        ]
    },

    {
        question:"Which of the following methods is used to access HTML elements using Javascript?",
        answer:[
            {test:"getElementById()",correct:"false"},
            {test:"getElementByClassName()",correct:"false"},
            {test:"A and B",correct:"true"},
            {test:"None",correct:"fase"},       
        ]
    },
    {
        question:"Upon encountering empty statements, what does the Javascript Interpreter do?",
        answer:[
            {test:"Throws an error",correct:"false"},
            {test:"Ignores the statments",correct:"true"},
            {test:"Gives the warning",correct:"false"},
            {test:"None",correct:"fase"},       
        ]
    },
    {
        question:"Which of the following methods can be used to display data in some form using Javascript??",
        answer:[
            {test:"document.write()",correct:"false"},
            {test:"console.log()",correct:"false"},
            {test:"window.alert()",correct:"false"},
            {test:"All of the above",correct:"true"},       
        ]
    }
]

const questionElement = document.querySelector("#question");
const ansButton = document.querySelector(".answer-button");
const nextButton = document.querySelector("#next-btn");
const quiz = document.querySelector(".quiz");


let currQuesIndex = 0;
let score = 0;

function startQuiz(){
    currQuesIndex = 0;
    score = 0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetstate();
    let currentQuestion = questions[currQuesIndex];
    let questionNo = currQuesIndex + 1;
    questionElement.innerHTML = questionNo + ". "+currentQuestion.question

    currentQuestion.answer.forEach((answer)=>{
        const button=document.createElement("button");
        button.classList.add("btn");
        button.innerText=answer.test;
        ansButton.appendChild(button);

        // if(answer.correct){
            button.dataset.correct=answer.correct;
        // }

        button.addEventListener("click",selectAnswer)
        
    })
}

function resetstate(){
    nextButton.style.display = "none";
    while(ansButton.firstChild){
        ansButton.removeChild(ansButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    console.log(isCorrect)
    console.log(e.target)

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(ansButton.children).forEach((button)=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    })
    nextButton.style.display="block"
}

function shoeScore(){
    resetstate();
    questionElement.innerHTML=`You Score is ${score}`;
    nextButton.innerHTML="Play Again"
    nextButton.style.display="block"

}

function handleNextBtn(){
    currQuesIndex++;
    if(questions.length>currQuesIndex){
        showQuestion();
    }
    else{
        shoeScore();

    }
}
nextButton.addEventListener("click",()=>{ 
    if(questions.length>currQuesIndex){
        handleNextBtn();  
    }
    else{
        startQuiz();
    }
});


startQuiz();