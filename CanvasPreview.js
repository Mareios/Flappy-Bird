// Creating preview Canvas
class CanvasPreview {
    constructor() {
        this.canvas = document.querySelector("#canvasPreview");
        this.context = this.canvas.getContext("2d");
        this.clearContext();
        this.update(JSON.parse(localStorage.getItem("background")), "background");
    }

    clearContext() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    update(img, type) {
        let backg = img;
        const ctx = this.context;

        if (backg != "") {
            if (type === "obstacle") {
                this.context.fillStyle = backg;
                this.context.fillRect(160, 0, 5, 60);
                this.context.fillRect(160, 120, 5, 30);
                this.context.fillRect(250, 0, 5, 30);
                this.context.fillRect(250, 90, 5, 60);

                return;
            } else {
                let image = new Image();
                image.src = backg;
                image.onload = () => {
                    if (type === "background")
                        this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
                    this.update(localStorage.getItem("bird"), "bird");
                    this.update(localStorage.getItem("obstacle"), "obstacle");

                    if (type === "bird") {
                        this.context.drawImage(image, 30, 70, 30, 30);
                    }
                };
            }
        }
    }
}

prev = new CanvasPreview();