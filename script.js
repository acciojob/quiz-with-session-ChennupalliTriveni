//your JS code here.

// Restore user progress (session storage)
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Get questions container
const questionsElement = document.getElementById("questions");

// Listen for answer selection & save to session storage
document.addEventListener("change", (event) => {
  if (event.target.type === "radio") {
    const name = event.target.name; // question-0, question-1,...
    const value = event.target.value;

    userAnswers[name] = value;
    sessionStorage.setItem("progress", JSON.stringify(userAnswers));
  }
});

// Handle Submit
document.getElementById("submit").addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    const qName = `question-${i}`;
    const selected = userAnswers[qName];

    if (selected && selected === questions[i].answer) {
      score++;
    }
  }

  // Save score in localStorage
  localStorage.setItem("score", score);

  // Display score
  document.getElementById("score").innerText = `Your score is ${score} out of ${questions.length}.`;
});

// Display last stored score (if exists)
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  document.getElementById("score").innerText =
    `Your last score was ${savedScore} out of ${questions.length}.`;
}


// Do not change code below this line
// This code will just display the questions to the screen
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Restore saved answer
      if (userAnswers[`question-${i}`] === choice) {
        choiceElement.setAttribute("checked", true);
      }

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }

    questionsElement.appendChild(questionElement);
  }
}

renderQuestions();
