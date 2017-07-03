// Update score in LocalStorage
function updateStorageScore(actualScore) {
    // Update score
    let userScore = JSON.parse(localStorage.score);
    userScore.push(actualScore);
    localStorage.setItem("score", JSON.stringify(userScore));


    function addZeroToDate(minutes) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes;
    }

    // Update Date
    let userDate = JSON.parse(localStorage.date);
    let date = new Date();
    let dateToPush = date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear() + " " + date.getHours() + ":" + addZeroToDate(date.getMinutes());

    userDate.push(dateToPush);
    localStorage.setItem("date", JSON.stringify(userDate));
}

// File API
function handleFile() {

    if (this.files[0].type != "image/png") { // Not PNG image
        removeErrorText();
        fileErrorText("Wrong file format! Please, insert PNG image.");
        return;
    } else if (this.files[0].size > 999999) { // Larger than 1 MB
        removeErrorText();
        fileErrorText("Too large file! Insert file with less than 1 MB.");
        return;
    } else if (this.files[0].type == undefined) {
        return;
    } else {
        removeErrorText();
    }

    let reader = new FileReader();
    reader.readAsDataURL(this.files[0]);
    reader.onloadend = function() {
        prev.clearContext();
        prev.update(reader.result, "background");
        localStorage.setItem("background", JSON.stringify(reader.result));
    };

    function fileErrorText(text) {
        let spanEl = document.createElement("span");
        spanEl.textContent = text;
        document.querySelector("#settings p").appendChild(spanEl);
    }

    function removeErrorText() {
        if (document.querySelector("#settings p span")) {
            document.querySelector("#settings p span").parentNode.removeChild(document.querySelector("#settings p span"));
        }
    }
}

// Drag & Drop
function drag(event) {
    event.dataTransfer.setData("imageDrag", event.target.id);
}

function drop(event) {
    event.preventDefault();
    prev.clearContext();

    let dt = event.dataTransfer.getData("imageDrag");

    if (dt != "bird_classic" && dt != "bird_profi" && dt != "bird_red" && dt != "black" && dt != "red") {
        alert("This drag is not supported!");
        return;
    }

    // Obstacle
    if (dt == "black" || dt == "red") {
        prev.update(JSON.parse(localStorage.background), "background");
        prev.update(dt, "obstacle");
        localStorage.setItem("obstacle", dt);
        return;
    }

    dt = "img/" + dt + ".png";

    prev.update(JSON.parse(localStorage.background), "background");
    localStorage.setItem("bird", dt);
    prev.update(dt, "bird");
}

function allowDrop(event) {
    event.preventDefault();
}