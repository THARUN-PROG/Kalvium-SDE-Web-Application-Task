const questions = [
  {
    question:
      "Which of the following command is used to Install create-react-app?",
    answers: [
      { text: "npm install create-react-app", correct: false },
      { text: " npm install -f create-react-app", correct: false },
      { text: "npm install -g create-react-app", correct: true },
      { text: "install -g create-react-app", correct: false },
    ],
  },

  {
    question: "Which of the following are static methods in JavaScript?",
    answers: [
      { text: "Date.parse()", correct: false },
      { text: "Date.UTC()", correct: false },
      { text: "Both Date.parse() and Date.UTC()", correct: true },
      { text: "Date.clear()", correct: false },
    ],
  },

  {
    question:
      "Which of the following is a type of polymorphism in Java Programming?",
    answers: [
      { text: "Compile time polymorphism", correct: true },
      { text: "Multilevel polymorphism", correct: false },
      { text: "Execution time polymorphism", correct: false },
      { text: "Multiple polymorphism", correct: false },
    ],
  },

  {
    question: "Which exception is thrown when java is out of memory?",
    answers: [
      { text: "OutOfMemoryError", correct: true },
      { text: "MemoryOutOfBoundsException", correct: false },
      { text: "MemoryFullException", correct: false },
      { text: "MemoryError", correct: false },
    ],
  },

  {
    question:
      "What are the worst case and average case complexities of a binary search tree?",
    answers: [
      { text: "O(n), O(n)", correct: false },
      { text: "O(logn), O(logn)", correct: false },
      { text: "O(logn), O(n)", correct: false },
      { text: "O(n), O(logn)", correct: true },
    ],
  },

  {
    question:
      "Which of the following is an application of Red-black trees and why?",
    answers: [
      { text: "used to store integers efficiently", correct: false },
      { text: "used to store strings efficiently", correct: false },
      { text: "can be used in process schedulers, maps, sets", correct: true },
      { text: "for efficient sorting", correct: false },
    ],
  },

  {
    question:
      "The DBMS acts as an interface between ________________ and ________________ of an enterprise-class system.",
    answers: [
      { text: "Data and the DBMS", correct: false },
      { text: "Application and SQL", correct: false },
      { text: "Database application and the database", correct: true },
      { text: "The user and the software", correct: false },
    ],
  },

  {
    question:
      "_________________ operations do not preserve non-matched tuples.",
    answers: [
      { text: "Inner join", correct: true },
      { text: "Left outer join", correct: false },
      { text: "Right outer join", correct: false },
      { text: "Natural join", correct: false },
    ],
  },

  {
    question:
      "The user IDs can be added or removed using which of the following fixed roles?",
    answers: [
      { text: "db_accessadmin", correct: true },
      { text: "db_sysadmin", correct: false },
      { text: "db_setupadmin", correct: false },
      { text: "db_securityadmin", correct: false },
    ],
  },

  {
    question:
      "Full duplex mode increases the capacity of each domain by ________",
    answers: [
      { text: "20 to 30 mbps", correct: false },
      { text: "30 to 40 mbps", correct: false },
      { text: "40 to 50 mbps", correct: false },
      { text: "10 to 20 mbps", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

//This method will display the questions

function showQuestion() {
  resetState(); //This decides the previous question and answers
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct; //It will add the true (or) false in this dataset Correct
    }
    button.addEventListener("click", selectAnswer); //When we click on the answer button, it will call the function selectAnswer()
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild); //It will remove all the previous answers
  }
}

//let's define the function selectAnswer here below,

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct"); //If the dataset is true then it will add the classname correct or it will add the classname Incorrect
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
      score++; //It will increase the score by 1
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

//I am defining the function - showScore

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}! `;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

//Now, I am defining the function - handleNextButton

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
