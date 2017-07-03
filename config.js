// LocalStorage
if (!localStorage.score) localStorage.setItem("score", JSON.stringify([]));
if (!localStorage.date) localStorage.setItem("date", JSON.stringify([]));
if (!localStorage.bird) localStorage.setItem("bird", "img/bird_red.png");
if (!localStorage.background) localStorage.setItem("background", JSON.stringify(imageToBase64("img/white.png")));
if (!localStorage.obstacle) localStorage.setItem("obstacle", "black");

let backgroundMusic = new Audio(), crashMusic = new Audio();

if (backgroundMusic.canPlayType("audio/wav") != "") {
    backgroundMusic.src = "sound/SONG_sound.wav";

}
if (crashMusic.canPlayType("audio/mp3") != "") {
    crashMusic.src = "sound/HOP_sound.mp3";
}

function imageToBase64(imagePath) {
    let tempCanvas = document.createElement("canvas");
    let tempImg = document.createElement("img");
    let tempCtx = tempCanvas.getContext("2d");

    tempImg.onload = () => {
        tempCtx.drawImage(tempImg, 0, 0);
    };

    tempImg.src = imagePath;

    return tempCanvas.toDataURL();
}