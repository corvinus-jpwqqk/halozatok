//var kérdések;
function letoltes() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data)
        );
}

function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés");
    console.log(d);
    kérdések = d;
}

function kerdesMegjelenites(kerdes) {
    console.log(kerdes);
    console.log(kérdések);
    document.getElementById("kérdés_szöveg").innerHTML = kérdések[kerdes].questionText;
    document.getElementById("válasz1").innerHTML = kérdések[kerdes].answer1;
    document.getElementById("válasz2").innerHTML = kérdések[kerdes].answer2;
    document.getElementById("válasz3").innerHTML = kérdések[kerdes].answer3;
    if (kérdések[kerdes].image != "") {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdések[kerdes].image;
    }
    for (var i = 1; i <= 3; i++) {
        document.getElementById("válasz" + i.toString()).style.backgroundColor = "grey";
    }
}

function nextQuestion() {
    if (aktKerdes == kérdések.length-1) {
        aktKerdes = 0;
        kerdesMegjelenites(aktKerdes);
    }
    else {
        kerdesMegjelenites(++aktKerdes);
    }
}
function prevQuestion() {
    if (aktKerdes != 0) {
        kerdesMegjelenites(--aktKerdes);
    }
    else {
        aktKerdes = kérdések.length - 1;
        kerdesMegjelenites(aktKerdes);
    }
}

function answered(answer) {
    if (kérdések[aktKerdes].correctAnswer == answer) {
        document.getElementById("válasz" + answer.toString()).style.backgroundColor = "green";
    }
    else {
        document.getElementById("válasz" + answer.toString()).style.backgroundColor = "red";
        document.getElementById("válasz" + kérdések[aktKerdes].correctAnswer.toString()).style.backgroundColor = "green";
    }
}