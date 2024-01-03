let randomNumber = parseInt((Math.random()*100 + 1));
console.log(randomNumber);

//extraction from DOM:
const userInput = document.getElementById('guessFiled')
const submit = document.getElementById('submit')
const guessSlot = document.querySelector('.guesses')
const remaining = document.querySelector('.remainingGuesses')
const lowOrHi = document.querySelector('.lowOrHi')
const startOver = document.querySelector('.resultParas')

//creating an element to inject it in DOM later
const p = document.createElement('p')


//initializing default values:
let prevGuesses = [];
let guessNum = 0;

let playGame = true;

//when elegible to play:
if(playGame){
    submit.addEventListener('click', function(event){
        event.preventDefault()

        const guess = parseInt(userInput.value)
        validateGuess(guess);
    })
}

//using different functions:
function validateGuess(guess){
    if(isNaN(guess)){
        alert('Please enter a valid number!')
    }else if(guess < 1){
        alert('Please enter a positive number!')
    }else if(guess > 100){
        alert('Please enter a number between 1 and 100')
    }
    else{
        prevGuesses.push(guess)
        if(guessNum >= 5){
            displayGuesses(guess)
            displayMessage(`Game Over! The number was ${randomNumber}`)
            endGame()
        }else{
            displayGuesses(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess(guess){
    if(guess === randomNumber){
        displayMessage(`You guessed it right!`)
        endGame()
    }else if(guess < randomNumber){
        displayMessage(`Oops! too low`)
    }else if(guess > randomNumber){
        displayMessage(`Oops! too high`)
    }
}

function displayMessage(message){
    lowOrHi.innerHTML = `<h2>${message}</h2>`
}

function displayGuesses(guess){
    userInput.value = ''
    guessSlot.innerHTML += `${guess}  `
    guessNum++;
    remaining.innerHTML = `${6-guessNum}` 
}

function endGame(){
    userInput.value = ''
    userInput.setAttribute('disabled', '');
    p.classList.add('button')
    p.innerHTML = '<h2 id = "newGame" class = "w-1/2 flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded">Start New Game</h2>'
    startOver.appendChild(p);
    playGame = false;
    newGame()
}

function newGame(){
    const newgameBtn = document.getElementById('newGame');
    newgameBtn.addEventListener('click', function(event){
        event.preventDefault();

        randomNumber = parseInt((Math.random()*100 + 1));
        userInput.removeAttribute('disabled')
        guessSlot.innerHTML = ''
        lowOrHi.innerHTML = ''
        prevGuesses = []
        guessNum = 0
        remaining.innerHTML = `${6-guessNum}`
        startOver.removeChild(p)
        playGame = true;
    })
}