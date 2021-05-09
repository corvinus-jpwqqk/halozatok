﻿var hotList = [];
var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nexQuestion = 1;
var TimerHandler;

document.addEventListener("DOMContentLoaded", init);

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        hotList[i] = {
            question: {}, 
            goodAnswers: 0
        }
    }

    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nexQuestion, i);
        nexQuestion++;
    }

    fetch("questions/count")
        .then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n)})

    document.getElementById("btnForward").addEventListener('click', előre);
    document.getElementById("btnBack").addEventListener('click', hátra);
}

fcuntion kérdésBetöltés(questionNumber, destination){
    fetch('/questions/${questionNumber}')
        .then(result => {
            if (!result.ok) {
                console.erroe('Hibás letöltés: $(result.status)');
                return null;
            }
            else {
                return result.json();
            }
        })
        .then(q => {
            hotList[destination].question = q;
            hotList[destination].goodAnswers = 0;
            if (displayedQuestion === undefined &&destination === 0) {
                displayedQuestion = 0;
                kérdékérdésMegjelenítés();
            }
        })
}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    document.getElementById("kérdés_szöveg").innerText = kérdés.question;
    document.getElementById("válasz1").innerText = kérdés.answer1;
    document.getElementById("válasz2").innerText = kérdés.answer2;
    document.getElementById("válasz3").innerText = kérdés.answer3;
    if (kérdés.image) {
        document.getElementById("kép").src = kérdés.image;
        document.getElementById("kép").style.display = "block";
    }
    else {
        document.getElementById("kép").style.display = "none";
    }
    for (var i = 0; i < 3; i++) {
        document.getElementById("válasz" + i).classList.remove("jó rossz");
    }
    document.getElementById("válaszok").style.pointerEvents = "auto"; 
}

function előre() {
    clearTimeout(TimerHandler);
    displayedQuestion++;
    if (displayedQuestion === questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés();
}

function hátra() {
    displayedQuestion--;
    if (displayedQuestion<0) displayedQuestion = questionsInHotList-1;
    kérdésMegjelenítés();
}


function választás(n){
    let kérdés = hotList[displayedQuestion].question;
    if (n === kérdés.correctAnswer) {
        document.getElementById("válasz" + n).classList.add("jó");
        hotList[displayedQuestion].goodAnswers++; 
        if (hotList[displayedQuestion].goodAnswers===3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    }
    else {
        document.getElementById("válasz" + n).classList.add("rossz");
        document.getElementById("válasz" + kérdés.correctAnswer).classList.add("jó");
        hotList[displayedQuestion].goodAnswers=0; 
    }

    document.getElementById("válaszok").style.pointerEvents = "none"; 

    
    TimerHandler = setTimeout(előre, 3000);

}