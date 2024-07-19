// letters------------------------------------
const letters ="abcdefghijklmnopqrstuvwxyz";
const space=0;
// get array from letters 
let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector(".letters");

lettersArray.forEach(letter => {
    
    //create span
    let span = document.createElement('span');

    //create letter text node
    let theLetter = document.createTextNode(letter);

    //append the letter to span
    span.appendChild(theLetter);

    //add class to span
    span.className = 'letter-box';

    lettersContainer.appendChild(span);
});

// object of word + categories
const words = {
    porgamming:["php", "javascript", "go", "scale", "c", "mysql", "python"],
    movies:["Prestige", "Inception", "Parasite", "Wiplash", "Memento", "Coco", "Up"],
    people: ["Elon musk", "Mohammed issa", "hamza", "alaa", "Rawan"],
    countries: ["syria", "Egypt", "Qatar", "Yemen", "Iraq"]
}

// Get random property 

let allKeys = Object.keys(words);
// Now I have an array of keys.
// Random number depend on keys length 
let randomPropNum = Math.floor(Math.random() * allKeys.length);
// category
let randomPropName = allKeys[randomPropNum];
// category words
let randomPropValue = words[randomPropName];
let randomValueNum = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNum];

// set category name
document.querySelector(".game-info .category span").innerHTML = randomPropName;

let letterGuessContainer = document.querySelector(".letters-guess");

//Convert chosen word to array
let lettersAndSpaces = Array.from(randomValueValue);

lettersAndSpaces.forEach(letter =>{
    let span = document.createElement("span");

    if(letter === ' '){
        span.className= 'with-space';
        space=1;
    }

    letterGuessContainer.appendChild(span);
})

let guessSpans  = document.querySelectorAll(".letters-guess span");

let wrongAttemps = 0;
let theDraw = document.querySelector(".hangman-draw");

document.addEventListener('click', (e) =>{
    let theStatus = false;

    if(e.target.className === "letter-box"){
        e.target.classList.add("clicked");

        let theClickedLetter = e.target.innerHTML.toLowerCase();
        // console.log(theClickedLetter);

        let chosenWord = Array.from(randomValueValue.toLowerCase());

        chosenWord.forEach((wordLetter, wordIndex) =>{

            if(theClickedLetter == wordLetter){
                theStatus=true;
                //Loop on all guess spans
                guessSpans.forEach((span, spanIndex)=>{

                    if(wordIndex === spanIndex){
                        span.innerHTML=wordLetter;
                    }
                })
            }
        })
        // console.log(theStatus);
        if(theStatus !== true) {
            wrongAttemps++;
            theDraw.classList.add(`wrong-${wrongAttemps}`);

            document.getElementById("fail").play();

            if(wrongAttemps === 8){

                endGame();
                lettersContainer.classList.add("finished");
            }
            
        }else{
            document.getElementById("success").play();
            const spans = document.querySelectorAll('.letters-guess');
            let combinedText = '';
            spans.forEach(span => {
            combinedText += span.textContent;

            if(combinedText.length === randomValueValue.length){
                
                lettersContainer.classList.add("finished");
                GreatJob();
            }
    });
        }
    }

});


function endGame(){
    let div = document.createElement("div");
    let divText = document.createTextNode(`Game Over! The Word is: ${randomValueValue}`);
    div.appendChild(divText);
    div.className = "popup";
    document.body.appendChild(div);
}

function GreatJob(){
    let div = document.createElement("div");
    let divText = document.createTextNode(`Great Job! You did it`);
    div.appendChild(divText);
    div.className = "greatjob";
    document.body.appendChild(div);
}

const spans = document.querySelectorAll('.letters-guess');
    let combinedText = '';
    spans.forEach(span => {
        combinedText += span.textContent;
    });

    console.log(combinedText.length);
