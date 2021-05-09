
function letoltes() {
    fetch('/questions/all')
        .then(response => response.json())
        .then(data => sorSzamok(data)
    );

    for (var i = 1; i < 8; i++) {
        fetch('/questions/${i}')
            .then(response => response.json())
            .then(data => addToList(data)
            );
    }
}

function addToList(kerdesdata) {
    console.log(gyakKerdesek.length);
    gyakKerdesek.push(kerdesdata);
    console.log(kerdesdata.kerdes);
}


function sorSzamok(kerdesek) {
    osszesKerdes = kerdesek.length;
    console.log("osszes kerdes szama: " + osszesKerdes);
    console.log('aktKerdesInitial: ' + aktKerdes);
}

function ujKerdesLetolt(kerdesszam) {
    console.log("Aktuális kérdés átadva:" + kerdesszam)
    var fetchroute = "/questions/" + kerdesszam.toString();
    fetch(fetchroute)
        .then(response => response.json())
        .then(data => kerdesMegjelenites(data)
        );
}


function kerdesMegjelenites(kerdes) {
    console.log("Aktuális kérdés: " + aktKerdes);
    kerdesAll = kerdes;
    document.getElementById("kérdés_szöveg").innerHTML = kerdes.questionText;
    document.getElementById("válasz1").innerHTML = kerdes.answer1;
    document.getElementById("válasz2").innerHTML = kerdes.answer2;
    document.getElementById("válasz3").innerHTML = kerdes.answer3;
    if (kerdes.image != "") {
        document.getElementById("kép1").style.visibility = 'visible';
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kerdes.image;
    }
    else {
        document.getElementById("kép1").style.visibility = 'hidden';
    }
    for (var i = 1; i <= 3; i++) {
        document.getElementById("válasz" + i.toString()).style.backgroundColor = "grey";
    }
}

function nextQuestion() {
    if (aktKerdes == 0) {
        aktKerdes = 2;
        ujKerdesLetolt(aktKerdes);
    }
    else if (aktKerdes == 6) {
        aktKerdes = 1;
        ujKerdesLetolt(aktKerdes);
    }
    else {
        ujKerdesLetolt(++aktKerdes);
    }
}
function prevQuestion() {
    if (aktKerdes != 1) {
        ujKerdesLetolt(--aktKerdes);
    }
    else {
        aktKerdes = 6;
        ujKerdesLetolt(aktKerdes);
    }
}

function answered(answer) {
    if (kerdesAll.correctAnswer == answer) {
        document.getElementById("válasz" + answer.toString()).style.backgroundColor = "green";
    }
    else {
        document.getElementById("válasz" + answer.toString()).style.backgroundColor = "red";
        document.getElementById("válasz" + kerdesAll.correctAnswer.toString()).style.backgroundColor = "green";
    }
}

function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kérdésMegjelenítés(data));
}    