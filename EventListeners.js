// Control the bird by arrows Up and Down
window.addEventListener("keydown", e => {
    if (e.keyCode === 32) e.preventDefault();
    gameArea.keys = gameArea.keys || [];
    gameArea.keys[e.keyCode] = true;

});
window.addEventListener("keyup", e => {
    e.preventDefault();

    if (end && location.hash === "#playGame") {
        if (e.keyCode === 32) {
            end = false;
            document.querySelector(".countdown").style.display = "block";
            gameArea.clear();
            setTimeout(gameBegin, 3000);
        }
    }
    gameArea.keys = gameArea.keys || [];
    gameArea.keys[e.keyCode] = false;
});



// Restart game
function restartGame() {
    gameArea.stop();
    document.querySelector(".countdown").style.display = "block";
    gameAfterRestart = setTimeout(gameBegin, 3000);
}

window.addEventListener("popstate", e => {
    if (location.hash !== "") {
        document.querySelector("#welcomePage").style.display = "none";
    } else if (location.hash === "") {
        document.querySelector("#welcomePage").style.display = "flex";
    }

    if (location.hash !== "#playGame") {
        clearTimeout(gameAfterRestart);
    }

    if (location.hash !== "#stats" && document.querySelector("#statsRecent tbody")) {
        document.querySelector("#statsRecent tbody").parentNode.removeChild(document.querySelector("#statsRecent tbody"));
        document.querySelector("#statsTop tbody").parentNode.removeChild(document.querySelector("#statsTop tbody"));
    }

    // Update stats
    if (location.hash === "#stats") {
        if (document.querySelector("#statsRecent tbody") && document.querySelector("#statsTop tbody")) {
            document.querySelector("#statsRecent tbody").parentNode.removeChild(document.querySelector("#statsRecent tbody"));
            document.querySelector("#statsTop tbody").parentNode.removeChild(document.querySelector("#statsTop tbody"));
        }
        renderTableRecent();
        renderTableTop();

    }

    // History API
    let stateobj = {};
    switch (location.hash) {
        case "":
            stateobj = { name: "Welcome page" };
            history.replaceState(stateobj, stateobj.name, "");
            document.title = stateobj.name;
            break;
        case "#playGame":
            stateobj = { name: "Gaming page" };
            history.replaceState(stateobj, stateobj.name, "");
            document.title = stateobj.name;
            break;
        case "#settings":
            stateobj = { name: "Settings" };
            history.replaceState(stateobj, stateobj.name, "");
            document.title = stateobj.name;
            break;
        case "#stats":
            stateobj = { name: "Statistics" };
            history.replaceState(stateobj, stateobj.name, "");
            document.title = stateobj.name;
            break;
        case "#about":
            stateobj = { name: "About page" };
            history.replaceState(stateobj, stateobj.name, "");
            document.title = stateobj.name;
            break;
    }
});

// For Edge
window.addEventListener("hashchange", e => {
    if (window.navigator.userAgent.indexOf("Edge") > -1) { // Edge detected
        console.log("edge");
        if (location.hash !== "") {
            document.querySelector("#welcomePage").style.display = "none";
        } else if (location.hash === "") {
            document.querySelector("#welcomePage").style.display = "flex";
        }

        if (location.hash !== "#playGame") {
            document.querySelector("#playGame").style.display = "none";
            clearTimeout(gameAfterRestart);
        } else if (location.hash === "#playGame") {
            document.querySelector("#playGame").style.display = "flex";
        }

        if (location.hash !== "#settings") {
            document.querySelector("#settings").style.display = "none";
        } else if (location.hash === "#settings") {
            document.querySelector("#settings").style.display = "flex";
        }

        if (location.hash !== "#stats") {
            document.querySelector("#stats").style.display = "none";
            if (document.querySelector("#statsRecent tbody")) {
                document.querySelector("#statsRecent tbody").parentNode.removeChild(document.querySelector("#statsRecent tbody"));
                document.querySelector("#statsTop tbody").parentNode.removeChild(document.querySelector("#statsTop tbody"));
            }
        } else if (location.hash === "#stats") {
            document.querySelector("#stats").style.display = "flex";
            renderTableRecent();
            renderTableTop();
        }

        if (location.hash !== "#about") {
            document.querySelector("#about").style.display = "none";
        } else if (location.hash === "#about") {
            document.querySelector("#about").style.display = "flex";
        }
    }
});

window.addEventListener("DOMContentLoaded", e => {
    // or hashchange

    document.querySelector("#welcomePage").style.display = "none";

    if (location.hash === "#playGame") {
        restartGame();
    }

    if (location.hash === "") { // Display SVG
        document.querySelector("#welcomePage").style.display = "flex";
    }

    if (location.hash !== "#stats") {
        document.querySelector("#statsRecent tbody").parentNode.removeChild(document.querySelector("#statsRecent tbody"));
        document.querySelector("#statsTop tbody").parentNode.removeChild(document.querySelector("#statsTop tbody"));
    }

    // History API
    let stateobj = {};
    switch (location.hash) {
        case "":
            stateobj = { name: "Welcome page" };
            history.replaceState(stateobj, stateobj.name, "");
            document.title = stateobj.name;
            break;
        case "#playGame":
            stateobj = { name: "Gaming page" };
            history.replaceState(stateobj, stateobj.name, "");
            document.title = stateobj.name;
            break;
        case "#settings":
            stateobj = { name: "Settings" };
            history.replaceState(stateobj, stateobj.name, "");
            document.title = stateobj.name;
            break;
        case "#stats":
            stateobj = { name: "Statistics" };
            history.replaceState(stateobj, stateobj.name, "");
            document.title = stateobj.name;
            break;
        case "#about":
            stateobj = { name: "About page" };
            history.replaceState(stateobj, stateobj.name, "");
            document.title = stateobj.name;
            break;
    }
});

document.querySelector(".playGame").addEventListener("click", e => {
    if (!end) {
        if (location.hash !== "#playGame") restartGame();
    }
});



// Reload to update stats
document.querySelector(".stats").addEventListener("click", e => {
    if (location.hash !== "#stats") {
        //renderTableRecent();
        //renderTableTop();
    }
});



// File API listener
document.querySelector("#inputFile").addEventListener("change", handleFile);



// Drag & Drop
document.querySelector("#settingsCanvasPreview canvas").addEventListener("drop", drop);
document.querySelector("#settingsCanvasPreview canvas").addEventListener("dragover", allowDrop);
document.querySelector("#settingsDetail #bird_classic").addEventListener("dragstart", drag);
//document.querySelector("#settingsDetail #bird_profi").addEventListener("dragstart", drag);
document.querySelector("#settingsDetail #bird_red").addEventListener("dragstart", drag);
document.querySelector("#settingsDetail #black").addEventListener("dragstart", drag);
document.querySelector("#settingsDetail #red").addEventListener("dragstart", drag);



// Animation end
document.querySelector(".countdown").addEventListener("animationend", e => {
    document.querySelector(".countdown").style.display = "none";
});



// Click on SVG
document.querySelector("#welcomePage svg").addEventListener("click", eyeBirdInAnimateEyeDown);