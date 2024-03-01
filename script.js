let gameName = "Guess The Word"
document.querySelector("h1").innerHTML = gameName;

let numberTries = 5;
let numberLetters = 6;
let currentTry = 1;
// let el = document.querySelector(`.try-${currentTry}`);

let wordToGuess = "";
let messageArea = document.querySelector(".message")

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
            input.addEventListener("keydown" , function (event){
                let currentIndex = Array.from(inputs).indexOf(event.target);
                if (event.key === "ArrowRight"){
                    let nextInput = currentIndex + 1;
                    if (nextInput < inputs.length) inputs[nextInput].focus();
                }
                if (event.key === "ArrowLeft"){
                    let prevtInput = currentIndex - 1;
                    if (prevtInput >= 0) inputs[prevtInput].focus();
                }
            })
        })
        console.log(wordToGuess);
    }
}
let guessBtn = document.querySelector(".check");
guessBtn.addEventListener("click",handleGuesses);
let words = ["Create","Update","Delete","Master","Branch","Mainly"];
wordToGuess = words[Math.floor(Math.random()*words.length)].toLowerCase();

function handleGuesses() {
    let successGuess = true;
    for (let i=1; i<= numberLetters ; i++ ){
        let inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
        let letter = inputField.value.toLowerCase();
        let actualLetter = wordToGuess[i -1];

        if (letter === actualLetter) {
            inputField.classList.add("in-place") 
        } else if (wordToGuess.includes(letter) && letter !== ""){
            inputField.classList.add("not-in-place")
            successGuess = false
        }else {
            inputField.classList.add("no");
            successGuess = false;
        }
    }
    if (successGuess) {
        messageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`
        let allTries = document.querySelectorAll(".inputs > div");
        allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
        guessBtn.style.backgroundColor = "#27303f"
        guessBtn.style.cursor = "no-drop"
    } else {
        document.querySelector(`.try-${currentTry}`).classList.add("disables-inputs");
        let currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        currentTryInputs.forEach((input) => (input.disabled = true));
        currentTry++;
        document.querySelector(`.try-${currentTry}`).classList.remove("disables-inputs");
        let nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        nextTryInputs.forEach((input) => (input.disabled = false));
        
        let el = document.querySelector(`.try-${currentTry}`);
        if (el) {
            document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
            el.children[1].focus();
        } else {
            guessBtn.style.backgroundColor = "#27303f"
            guessBtn.style.cursor = "no-drop"
            messageArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
        }
    }
}

window.onload = function(){
    generateInput()
}
