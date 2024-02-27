let gameName = "Guess The Word"
document.querySelector("h1").innerHTML = gameName;

let numberTries = 5;
let numberLetters = 6;
let currentTry = 1;

let wordToGuess = "";
function generateInput() {
    let inputContainer = document.querySelector(".inputs")
    for (let i = 1; i <= numberTries ; i++){
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;
        if (i!== 1){
            tryDiv.classList.add("disabled-inputs")
        }
        for (let j =1; j<=numberLetters; j++){
            let input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute("maxlength","1");
            tryDiv.appendChild(input);
        }
        inputContainer.appendChild(tryDiv);
        inputContainer.children[0].children[1].focus();

        let inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input")
        inputsInDisabledDiv.forEach((input) => (input.disabled= true));

        let inputs = document.querySelectorAll("input");
        inputs.forEach((input , index) => {
            input.addEventListener("input",function(){
                this.value = this.value.toUpperCase();
                let nextInput = inputs[index + 1]
                if (nextInput){
                    nextInput.focus(); 
                }
            });
        })

    }
}
let guessBtn = document.querySelector(".check");
let words = ["Create","Update","Delete","Master","Branch","Mainly"];
wordToGuess = words[Math.floor(Math.random()*words.length)].toLocaleLowerCase();

function handleGuesses() {
    let successGuess = true;
    for (let i=1; i<= numberLetters; i++ ){
        let inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
        let letter = inputField.value.toLocaleLowerCase();
        let actualLetter = wordToGuess[i -1];
    }
}

window.onload = function(){
    generateInput()
}
