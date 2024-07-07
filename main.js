const data =[
    {
        id:1,
        question:'Which planet is closest to the Sun?',        //sual
        answers: [' Venus', ' Mercury', 'Earth', 'Mars'] ,                    //cavablar
        correct: 1,                           //duzgun vacab 1 indexde durur
        score:10
    },
     {
        id:2,
        question:'Who wrote "1984"?',        //sual
        answers: ['J.R.R. Tolkien', 'Aldous Huxley', 'Ernest Hemingway', 'George Orwell'] ,                    //cavablar
        correct: 3 ,                          //duzgun vacab 1 indexde durur
        score:10
    },
     {
        id:3,
        question:'Who wrote the play "Romeo and Juliet"?',        //sual
        answers: ['Charles Dickens', 'Charles Dickens', 'William Shakespeare', 'Charles Dickens'] ,                    //cavablar
        correct: 2 ,                          //duzgun vacab 1 indexde durur
        score:10
    },
     {
        id:4,
        question:' Who painted the famous painting "The Starry Night"?',        //sual
        answers: ['Vincent van Gogh', 'Pablo Picasso', ' Claude Monet', ' Claude Monet'] ,                    //cavablar
        correct: 0 ,                          //duzgun vacab 1 indexde durur
        score:10
    },  
     {
        id:5,
        question:'What is the longest river in the world?',        //sual
        answers: [' Nile', 'Yangtze', 'Mississippi', 'Amazon'] ,                    //cavablar
        correct: 3 ,                          //duzgun vacab 1 indexde durur
        score:10
    },
     {
        id:6,
        question:' Who painted the Mona Lisa?',        //sual
        answers: [' Leonardo da Vinci', 'Vincent van Gogh', 'Vincent van Gogh', 'Michelangelo'] ,                    //cavablar
        correct: 0 ,                          //duzgun vacab 1 indexde durur
        score:10
    },
     {
        id:7,
        question:'Which country is famous for sushi?',        //sual
        answers: ['China', 'Japan', 'Thailand', 'India'] ,                    //cavablar
        correct: 1 ,                          //duzgun vacab 1 indexde durur
        score:10
    },
    {
        id:8,
        question:'Who wrote the play "Hamlet"?',        //sual
        answers: ['Charles Dickens', 'Jane Austen', ' William Shakespeare', 'Oscar Wilde'] ,                    //cavablar
        correct: 2 ,                          //duzgun vacab 1 indexde durur
        score:10
    },
    {
        id:9,
        question:' Who played the character of Harry Potter in the Harry Potter film series?',        //sual
        answers: [' Rupert Grint', ' Daniel Radcliffe', ' Tom Felton', 'Emma Watson'] ,                    //cavablar
        correct: 1 ,                          //duzgun vacab 1 indexde durur
        score:10
    },
    {
        id:10,
        question:' Who is the Greek god of the sea?',        //sual
        answers: ['Zeus', 'Hades', 'Apollo', 'Poseidon'] ,                    //cavablar
        correct: 3 ,                          //duzgun vacab 1 indexde durur
        score:10
    },
]


const container = document.querySelector('#question-container')
const timers = document.querySelector("#timer");
const messages = document.querySelector("#message");
const button = document.querySelector("#next-button");


let currentQuestionIntex=0          //0 indexden bashla
let timeLeft=30;
let score=0;
let timer;
//suallar
const loadQuestion=()=>{
//  Eger currentQuestionIntex kicikdirse datamizin uzunlugundan questionData menimsedirik 
if(currentQuestionIntex <data.length){
const questionData =data[currentQuestionIntex];
 let answersHTML="";
//cavablari forEach saliriq
questionData.answers.forEach((answer,index)=>{
    answersHTML += ` <div class="form-check">
                    <input class="form-check-input" type="radio" name="answer" id="answer-${index}" value="${index}">
                    <label class="form-check-label" for="answer-${index}">
                        ${answer}
                    </label>
                </div>`;
});
//Suallari html Chixardiriq
container.innerHTML=`
                  <div class="card mt-3">
                <div class="card-header text-primary">
                    <div class="card-title ">${questionData.question}</div>
                </div>
                <div class="card-body">
                    ${answersHTML}
                </div>
            </div>`;


//name answer olan inputu secir
document.querySelectorAll('input[name="answer"]').forEach((input)=>{
    input.addEventListener("change",()=>{
        //aktiv edirik buttonu 
      button.disabled=false;
    });
});
// sifirlayiriq 
resetTimer();
startTimer();

}else{
    container.innerHTML=`<h2 class="text-center text-warning">Quiz Finished! Your score: ${score}</h2>`;
  //elementi gorulmez edir
  button.style.display='none'
  timers.style.display='none'
}

};






// zamani tekrarlamiriq
const resetTimer =()=>{
 // zamani dayandirar 
clearInterval(timer) 
// zamani yeniden bashladir 
timeLeft=30;
timers.classList.remove('red')
updateTimerDisplay()
};

const startTimer=()=>{
timer=setInterval(()=>{
    timeLeft--;
// san 10 dan azdirsa red
if(timeLeft<10){
    timers.classList.add('red');
}
updateTimerDisplay()
if(timeLeft===0){
    //zamani dayandiriram
    clearInterval(timer);
    messages.textContent='Time is up';
    button.disabled=false;
    button.click()

}
} ,1000);
};

// vaxti ektanda yenileyirik 
const updateTimerDisplay = () => {
    timers.textContent = `00:${timeLeft < 10 ? "0" : ""}${timeLeft}`;
  };

button.addEventListener('click',()=>{
 //secilmish cavabi gotur 
   const selectedAnswer= document.querySelector('input[name="answer"]:checked');
   //duzgun cavabin indexi
   const questionData =data[currentQuestionIntex];
   // Eger bir cevab seçilibse devam et
   if(selectedAnswer) {
     // Seçilen cevabın indeksini al
    const answerIndex =parseInt(selectedAnswer.value);
   
 // Eger seçilen cevab doğru ise
   if(answerIndex===questionData.correct){
     // Skoru yenile
    score+=questionData.score;
     // Seçilen cavabı  qırmızı ve kalın hala getir
   selectedAnswer.nextElementSibling.classList.add("text-success","fw-bold")
   }else{
    //cavab sehv olanda
    selectedAnswer.nextElementSibling.classList.add("text-danger", "fw-bold");
    //duzgun cavabi istifadeciye gosterir
    document.querySelector(`#answer-${questionData.correct}`).nextElementSibling.classList.add("text-success", "fw-bold")
   };
button.disabled=false;
//vaxti yenileyirik
setTimeout(() => {
    button.disabled=true;
    currentQuestionIntex++;
    messages.textContent="";
    button.textContent='Next';
    loadQuestion()
}, 2000);
//cavab vermeyibse
   }else{
    messages.textContent= 'You did not answer the question!'
    button.disabled=false;
    setTimeout(() => {
        messages.textContent="";
        currentQuestionIntex++;
        button.textContent='Next';
        loadQuestion();
        }, 2000);
   }
});
loadQuestion()











