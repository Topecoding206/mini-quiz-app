const questions = document.querySelector(".questions");
const container = document.querySelector(".container");
const buttons = document.querySelectorAll("button");
const scoreBoard = document.querySelector("#score");

let count = 0;
let correctAnswer = 0;
function display() {
  fetch(
    "https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=20&region=GB&difficulty=easy"
  )
    .then((response) => response.json())
    .then((data) => {
      questions.textContent = data[count].question;
      const options = [
        data[count].correctAnswer,
        ...data[count].incorrectAnswers,
      ].sort(() => Math.random() - 0.5);
      buttons.forEach((button, index) => {
        button.style.backgroundColor = "";
        button.style.color = "";
        button.textContent = options[index];
        button.addEventListener("click", (e) => {
          e.target.style.backgroundColor = "red";
          button.style.color = "white";
          if (data[count].correctAnswer === e.target.textContent && e.target) {
            correctAnswer++;
            count++;
            setTimeout(() => {
              display();
            }, 1500);
            button.style.backgroundColor = "green";
            button.style.color = "white";
          }
          if (data[count].correctAnswer !== e.target.textContent) {
            setTimeout(() => {
              for (let button of buttons) {
                if (button.innerText === data[count].correctAnswer) {
                  button.style.backgroundColor = "green";
                  button.style.color = "white";
                  setTimeout(() => {
                    count++;
                    display();
                  }, 2000);
                }
              }
            }, 2000);
          }
        });
        if (count >= 10) {
          container.innerHTML = "";
          scoreBoard.textContent = `You score ${correctAnswer}/${count}`;
          count = 0;
        }
      });
    });
}

display();
