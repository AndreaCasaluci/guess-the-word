const wrapper=document.querySelector(".wrapper"),
      inputs=document.querySelector(".word"),
      hintTag=document.querySelector(".hint span"),
      guessLeft=document.querySelector(".guess span"),
      mistakes=document.querySelector(".wrong span"),
      resetBtn=document.querySelector(".reset"),
      hintBtn=document.querySelector(".showhint"),
      hintElement=document.querySelector(".hint"),
      typeInput=document.querySelector(".type-input");

// Initializing game variables
let word, incorrectLetters=[], correctLetters=[], maxGuesses;

// Select random word from word list and set up game
function startNewGame(){
    alert("New Game Started! Guess New Word :)");

    //Hide hint element
    hintElement.style.display="none";
    hintElement.style.opacity="0";

    // Choose random word from db and setup game
    const randWord= wordListIt[Math.floor(Math.random()*wordListIt.length)];
    word=randWord.word;
    
    // If word chars >= 5 then max guess = 8, else max guess = 6
    maxGuesses=word.length >= 5 ? 8 : 6;

    incorrectLetters=[];
    correctLetters=[];
    hintTag.innerText=randWord.hint;
    guessLeft.innerText=maxGuesses;
    mistakes.innerText=incorrectLetters;

    // Create input for each letter of word
    inputs.innerHTML="";
    for(let i=0; i<word.length; i++){
        const input=document.createElement("input");
        input.type="text";
        input.disabled=true;
        inputs.appendChild(input);
    }
    wrapper.style.width="fit-content";
}

// Handle user input and update game stats
function handleInput(e){

    // Ignore non-letters input and letters that have already guessed
    const key=e.target.value.toLowerCase();
  //  if(key.match(/^[a-z]+$/i) && !incorrectLetters.includes(` & {key}`) && !correctLetters.includes(` {key}`)){
    if(key.match(/^[a-z]+$/i) && !incorrectLetters.includes(`${key}`) && !correctLetters.includes(`${key}`)){
        if(word.includes(key)){

            // Update correct guess
            for(let i=0; i<word.length; i++){
                if(word[i]===key){
                    inputs.querySelectorAll("input")[i].value+=key;
                    correctLetters.push(`${key}`);
                }
            }
          /* correctLetters+=key;*/
          /* correctLetters.push(`${key}`);*/
        }
        else{

            // Update incorrect guess
            maxGuesses--;
            incorrectLetters.push(`${key}`);
            mistakes.innerText=incorrectLetters;
        }
    }

    // Update remain guess and check for win lose conditions
    guessLeft.innerText=maxGuesses;
    if(correctLetters.length===word.length){
       /* const tmpInputs=document.querySelectorAll(".input");*/
        for(let i=0; i<word.length; i++){
            // Fill empty inputs with correct letters
           inputs.querySelectorAll("input")[i].value=word[i];
        }

        setTimeout(() => {alert(`Congrats! You found the word ${word.toUpperCase()}`); startNewGame();}, 1);

        

       /* startNewGame();*/
    }
    else if(maxGuesses<1){
        alert("Game Over! Yoi don't have remaining guesses!");
        for(let i=0; i<word.length; i++){
            
            // Fill inputs with correct letters
            inputs.querySelectorAll("input")[i].value=word[i];
        }
    }

    // Clear input field
    typeInput.value= "";

}

// Show hint element
function showHintElement(){
    hintElement.style.display="block";
    hintElement.style.opacity="1";
}

// Setup event listeners
resetBtn.addEventListener("click", startNewGame);
hintBtn.addEventListener("click", showHintElement);
typeInput.addEventListener("input", handleInput);
inputs.addEventListener("click", () => typeInput.focus());
document.addEventListener("keydown", () => typeInput.focus());

startNewGame();


