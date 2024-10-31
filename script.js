const guesses = document.querySelector(".gueses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessField = document.querySelector(".guessField");
const guessSubmit = document.querySelector(".guessSubmit");
const resultParasContainer = document.querySelector(".resultParas");

guessSubmit.addEventListener("click", checkGuess);

guessField.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

let randomNumber = Math.floor(Math.random() * 10) + 1;
let guessCount = 1;

function checkGuess() {
    const userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = "Previous guesses:";
    }
    guesses.textContent = `${guesses.textContent} ${userGuess}`;

    if (userGuess === randomNumber) {
        lastResult.textContent = "Congratulations! You got it right!";
        lastResult.style.color = "green";
        lowOrHi.textContent = "";
        setGameOver();
    } else if (guessCount === 5) {
        lastResult.textContent = "GAME OVER!";
        lowOrHi.textContent = "";
        setGameOver();
    } else {
        lastResult.textContent = "Wrong!";
        if (userGuess < randomNumber) {
        lowOrHi.textContent = "Too low!";
        } else if (userGuess > randomNumber) {
        lowOrHi.textContent = "Too high!";
        }
    }

    guessCount++;
    guessField.value = "";
    guessField.focus();
}

function resetGame() {
    guessCount = 1;

    const resetParas = document.querySelectorAll(".resultParas p");
    for (const resetPara of resetParas) {
        resetPara.textContent = "";
    }

    if (resetButton) {
        resetButton.parentNode.removeChild(resetButton);
    }

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    randomNumber = Math.floor(Math.random() * 10) + 1;
}

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement("button");
    resetButton.classList.add("resetButton");
    resetButton.textContent = "Start new game";
    document.body.append(resetButton);
    resetButton.addEventListener("click", resetGame);
}
