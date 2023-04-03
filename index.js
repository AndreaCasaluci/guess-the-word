const wrapper=document.querySelector(".wrapper"),
      inputs=document.querySelector(".word"),
      hintTag=document.querySelector(".hint span"),
      guessLeft=document.querySelector(".guess span"),
      mistakes=document.querySelector(".wrong span"),
      resetBtn=document.querySelector(".reset"),
      hintBtn=document.querySelector(".showhint"),
      hintElement=document.querySelector(".hint"),
      typeInput=document.querySelector(".type-input");
      overlay=document.querySelector(".overlay");
    /*  endGameBox=document.querySelector(".endgame-box");*/

// Initializing game variables
let word, incorrectLetters=[], correctLetters=[], maxGuesses;

// Endgame overlay and endgame box
function endGame(tmpTitle, tmpSubtitle){
    while(overlay.firstChild){
        overlay.removeChild(overlay.firstChild);
    }
    overlay.style.display="flex";
    const endGameBox=document.createElement("div");
    const title=document.createElement("h1");
    const subtitle=document.createElement("h4");
    const newGameButton=document.createElement("div");
    title.innerText=tmpTitle;
    subtitle.innerText=tmpSubtitle;
    endGameBox.classList.add("endgame-box");
    newGameButton.classList.add("newgame-button");
    newGameButton.innerText="New Game";
    endGameBox.appendChild(title);
    endGameBox.appendChild(subtitle);
    endGameBox.appendChild(newGameButton);
    newGameButton.addEventListener("click", startNewGame);
    overlay.appendChild(endGameBox);
    
}
// Select random word from word list and set up game
function startNewGame(){
   /* alert("New Game Started! Guess New Word :)"); */

    //Hide hint element
    overlay.style.display="none";
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
    if(key.match(/^[a-z]+$/i) && !incorrectLetters.includes(` ${key}`.toUpperCase()) && !correctLetters.includes(`${key}`)){
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
            incorrectLetters.push(` ${key}`.toUpperCase());
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

      /*  setTimeout(() => {alert(`Congrats! You found the word ${word.toUpperCase()}`); startNewGame();}, 100);*/
      endGame("Hai indovinato!", `La parola era: ${word.toUpperCase()}`);
    }

    else if(maxGuesses<1){
       /* alert("Game Over! You don't have remaining guesses!");*/
        for(let i=0; i<word.length; i++){
            
            // Fill inputs with correct letters
            inputs.querySelectorAll("input")[i].value=word[i];
        }
        
        endGame("Game Over!", `Non hai indovinato la parola: ${word.toUpperCase()}`);
        
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


