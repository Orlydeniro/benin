const questions = [
    {
        type: 'multiple-choice',
        question: "Which city is the official capital of Benin?",
        options: ["Cotonou", "Ouidah", "Porto-Novo", "Abomey"],
        correctAnswer: "Porto-Novo"
    },
    {
        type: 'multiple-choice',
        question: "Which city is known as the economic capital of Benin?",
        options: ["Porto-Novo", "Abomey", "Cotonou", "Parakou"],
        correctAnswer: "Cotonou"
    },
    {
        type: 'multiple-choice',
        question: "Which town in Benin is a UNESCO World Heritage site, famous for its ties to the slave trade?",
        options: ["Abomey", "Porto-Novo", "Ouidah", "Parakou"],
        correctAnswer: "Ouidah"
    },
    {
        type: 'multiple-choice',
        question: "Which town was the historical capital of the Kingdom of Dahomey?",
        options: ["Cotonou", "Ouidah", "Abomey", "Parakou"],
        correctAnswer: "Abomey"
    },
    {
         type: 'multiple-choice',
        question: "Which city is a major inland transportation and trading hub in northern Benin?",
       options: ["Ouidah", "Abomey", "Cotonou", "Parakou"],
       correctAnswer: "Parakou"
   },
    {
        type: 'multiple-choice',
         question: "What is the name of the large central market in Porto-Novo known for its vibrant activity and local goods?",
        options: ["Dantokpa Market", "Fidjrosse Market", "Ouidah Market", "Parakou Market"],
        correctAnswer: "Dantokpa Market"
    },
    {
        type: 'multiple-choice',
       question: "Which town is known for its unique stilt village?",
        options: ["Natitingou", "Djougou", "Ganvie", "Ouidah"],
        correctAnswer: "Ganvie"
    },
    {
         type: 'true-false',
        question: "True or False: Porto-Novo is known for its busy and energetic nightlife.",
        correctAnswer: "False"
    },
    {
         type: 'true-false',
        question: "True or False: Cotonou is located inland and not close to the Atlantic coast.",
        correctAnswer: "False"
    },
    {
       type: 'true-false',
        question: "True or False: The 'Route des Esclaves' is located in Abomey.",
         correctAnswer: "False"
    },
     {
         type: 'true-false',
        question: "True or False: Abomey is located on the coast and known for its international atmosphere.",
        correctAnswer: "False"
    },
    {
      type: 'fill-in-the-blank',
      question: 'The name "Porto-Novo" means "__________" in Portuguese.',
      correctAnswer: "New Port",
      inputtype : "text"
   },
    {
    type: 'fill-in-the-blank',
    question: "The Autonomous Port is located in __________, and serves as a gateway for regional trade.",
    correctAnswer: "Cotonou",
     inputtype : "text"
    },
     {
       type: 'fill-in-the-blank',
       question: "The royal palaces of ___________ are a UNESCO World Heritage Site, with their unique architecture and rich decoration.",
        correctAnswer: "Abomey",
         inputtype : "text"
     },
     {
        type: 'fill-in-the-blank',
        question: "The town of  __________ is known for its rich cultural heritage and unique terrain near Pendjari National Park.",
        correctAnswer: "Natitingou",
        inputtype : "text"
    }
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerOptionsElement = document.getElementById('answer-options');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-button');
const quizResult = document.getElementById('quiz-result');
const resultMessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart-button');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizResult.style.display = 'none';
    questionContainer.style.display = 'block';
    nextButton.style.display = 'none';
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    if (currentQuestion.type === 'multiple-choice') {
      currentQuestion.options.forEach(option => {
          const button = document.createElement('button');
          button.innerText = option;
          button.classList.add('answer-btn');
          button.addEventListener('click', () => selectAnswer(option, currentQuestion));
          answerOptionsElement.appendChild(button);
        });
    }else if (currentQuestion.type === 'true-false'){
        const trueButton = document.createElement('button');
        trueButton.innerText = "True";
        trueButton.classList.add('answer-btn');
        trueButton.addEventListener('click', () => selectAnswer('True', currentQuestion));
        answerOptionsElement.appendChild(trueButton);
        const falseButton = document.createElement('button');
        falseButton.innerText = 'False';
        falseButton.classList.add('answer-btn');
         falseButton.addEventListener('click', () => selectAnswer('False', currentQuestion));
        answerOptionsElement.appendChild(falseButton);
    }else if (currentQuestion.type === 'fill-in-the-blank'){
        const inputField = document.createElement('input');
        inputField.type = "text";
        inputField.classList.add('answer-input');
         answerOptionsElement.appendChild(inputField);

        const submitButton = document.createElement("button");
        submitButton.innerText = "Submit";
        submitButton.classList.add('answer-btn');
        submitButton.addEventListener('click', ()=>{
            selectAnswer(inputField.value, currentQuestion)
        });

        answerOptionsElement.appendChild(submitButton)
    }
}

function resetState(){
     while (answerOptionsElement.firstChild) {
        answerOptionsElement.removeChild(answerOptionsElement.firstChild);
    }
    feedbackElement.innerText = '';
    feedbackElement.classList.remove('correct', 'incorrect')
    nextButton.style.display = 'none';

}

function selectAnswer(selectedAnswer, currentQuestion) {
  let correctAnswer = currentQuestion.correctAnswer;
    if (currentQuestion.type === 'fill-in-the-blank') {
       correctAnswer = currentQuestion.correctAnswer
    }

     const isCorrect =  typeof correctAnswer === 'string'
       ? selectedAnswer.toLowerCase() === correctAnswer.toLowerCase()
       : selectedAnswer === correctAnswer

    if(isCorrect) {
        score++;
        feedbackElement.textContent = 'Correct!';
        feedbackElement.classList.add('correct')
        if (currentQuestion.type === 'multiple-choice' || currentQuestion.type === "true-false"){
            const selectedButton = Array.from(answerOptionsElement.children).find(button => button.innerText === selectedAnswer);
             selectedButton.classList.add('correct')
        }


    } else{
        feedbackElement.textContent = 'Incorrect.';
        feedbackElement.classList.add('incorrect')
        if (currentQuestion.type === 'multiple-choice' || currentQuestion.type === "true-false"){
           const selectedButton = Array.from(answerOptionsElement.children).find(button => button.innerText === selectedAnswer);
           selectedButton.classList.add('incorrect');
           if (currentQuestion.type === 'multiple-choice'){
               const correctButton = Array.from(answerOptionsElement.children).find(button => button.innerText === currentQuestion.correctAnswer);
                 if (correctButton) {
                     correctButton.classList.add('correct')
                 }

           }else if (currentQuestion.type === 'true-false'){
              const correctAnswerButton = Array.from(answerOptionsElement.children).find(button => button.innerText === currentQuestion.correctAnswer)
                if (correctAnswerButton) {
                     correctAnswerButton.classList.add('correct')
                 }

           }

         }

     }

     disableAnswerButtons()
      nextButton.style.display = 'block';
}
function disableAnswerButtons() {
    if (document.querySelectorAll('.answer-btn')){
     const answerButtons = document.querySelectorAll('.answer-btn')
       answerButtons.forEach(button => {
            button.disabled = true
        })

    }
}


function handleNextButton() {
  currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
         showResult();
    }
}

function showResult(){
  questionContainer.style.display = 'none';
   quizResult.style.display = 'block';
   resultMessage.innerText = `You scored ${score} out of ${questions.length}!`;

}

nextButton.addEventListener('click', handleNextButton);
restartButton.addEventListener('click', startQuiz);

startQuiz();
