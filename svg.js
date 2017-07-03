// Snap.svg library to render SVG on Welcome page
let svg = Snap("#welcomePage svg");

let bodyBird = svg.circle(200, 150, 95);
bodyBird.attr({
    stroke: "black",
    strokeWidth: 5,
    fill: "yellow"
});

let eyeBird = svg.circle(255, 125, 35);
eyeBird.attr({
    stroke: "black",
    strokeWidth: 5,
    fill: "white"
});

let eyeBirdIn = svg.circle(275, 125, 15);

let pinionBird = svg.ellipse(120, 160, 55, 35);
pinionBird.attr({
    stroke: "black",
    strokeWidth: 5,
    fill: "grey"
});


/* Animations */
function eyeBirdInAnimateEyeDown() {
    eyeBirdIn.animate({cx: 270, cy: 135}, 500, eyeBirdInAnimateBig);
}

function eyeBirdInAnimateBig() {
    eyeBirdIn.animate({transform: "skew(1.3, 1.3)"}, 500, pinionBirdAnimateUp);
}

function pinionBirdAnimateUp() {
    pinionBird.animate({transform: "rotate(30 120 160)"}, 500, pinionBirdAnimateDown);

}

function pinionBirdAnimateDown() {
    pinionBird.animate({transform: "rotate(-30 120 160)"}, 500, pinionBirdAnimate);
}

function pinionBirdAnimate() {
    pinionBird.animate({transform: "rotate(0 120 160)"}, 500, eyeBirdInAnimateSmall);
}

function eyeBirdInAnimateSmall() {
    eyeBirdIn.animate({transform: "skew(1, 1)"}, 500, eyeBirdInAnimateEyeUp);
}

function eyeBirdInAnimateEyeUp() {
    eyeBirdIn.animate({cx: 275, cy: 125}, 500);
}