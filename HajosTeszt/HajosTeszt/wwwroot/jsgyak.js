window.onload = function () {
    szamolas();
    pascal();
}
function szamolas() {
    for (var i = 0; i < 10; i++) {
        var newDiv = document.createElement("div");
        newDiv.style.backgroundColor = 'rgb(' + (100 - i * 10).toString() + ',' + (100 - i * 10).toString() + ',' + (100 - i * 10).toString() + ')';
        newDiv.style.color = 'white';
        newDiv.style.display = 'inline';
        newDiv.innerText = (i + 1).toString();
        document.getElementById("szamos").appendChild(newDiv);
    }
}
function fact(n) {
    var f = 1;
    for (var i = 2; i <= n; i++) {
        f *= i;
    }
    return f;
}
function binomial(n, k) {
    return fact(n) / (fact(k) * fact(n - k));
}
function pascal() {
    for (var i = 0; i < 7; i++) {
        var newRow = document.createElement("div");
        newRow.id = "row" + i.toString();
        newRow.style.margin = '0 auto';
        newRow.classList.add('sor');
        document.getElementById("pascal").appendChild(newRow);
        for (var j = 0; j <= i; j++) {
            var newElement = document.createElement("div");
            newElement.innerText = binomial(i, j);
            newElement.style.display = 'inline';
            newElement.classList.add('elem');
            document.getElementById('row' + i.toString()).appendChild(newElement);

        }
    }
}