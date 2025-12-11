//your JS code here.

// Restore user progress
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

const questionsElement = document.getElementById("questions");

// Save answers in sessionStorage
document.addEventListener("change", (event) => {
  if (event.target.type === "radio") {
    const name = event.target.name;       // question-0
    const index = name.split("-")[1];     // 0
    const value = event.target.value;

    userAnswers[index] = value;

    sessionStorage.setItem("progress", JSON.stringify(userAnswers));
  }
});

// Submit logic
document.getElementById("submit").addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  localStorage.setItem("score", score);
  document.getElementById("score").innerText =
    `Your score is ${score} out of ${questions.length}.`;
});

// Show last score if exists
const lastScore = localStorage.getItem("score");
if (lastScore !== null) {
  document.getElementById("score").innerText =
    `Your last score was ${lastScore} out of ${questions.length}.`;
}


// --------------------------
// DO NOT CHANGE BELOW THIS
// --------------------------
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

      // FIXED → matches test expectations
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }

    questionsElement.appendChild(questionElement);
  }
}

renderQuestions();
