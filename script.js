const dog = document.getElementById("dog");
const dogImage = document.getElementById("dogImage");

const frames = [
    "dog/p/p1.PNG",
    "dog/p/p2.PNG",
    "dog/p/p3.PNG",
    "dog/p/p4.PNG",
    "dog/p/p5.PNG",
    "dog/p/p6.PNG",
    "dog/p/p7.PNG"
];

const frameDelay = 120;

let currentFrame = 0;
let animationTimer = null;
let isPressed = false;

const barkSound = new Audio("sounds/bark.mp3");
barkSound.volume = 0.5;

// Предзагрузка кадров
frames.forEach((src) => {
    const image = new Image();
    image.src = src;
});

// Проигрывание кадров от одного до другого
function playFrames(start, end, callback) {
    clearInterval(animationTimer);
    animationTimer = null;

    currentFrame = start;
    dogImage.src = frames[currentFrame];

    animationTimer = setInterval(() => {
        currentFrame++;

        if (currentFrame > end) {
            clearInterval(animationTimer);
            animationTimer = null;

            if (callback) callback();
            return;
        }

        dogImage.src = frames[currentFrame];
    }, frameDelay);
}

// Нажатие и удержание
dog.addEventListener("pointerdown", (event) => {
    if (isPressed) return;

    isPressed = true;

    barkSound.currentTime = 0;
    barkSound.play().catch(() => {});

    dog.setPointerCapture(event.pointerId);

    // Кадры 1–5
    playFrames(0, 4);
});

// Отпускание
function releaseDog() {
    if (!isPressed) return;

    isPressed = false;

    // Кадры 6–7
    playFrames(5, 6, () => {
        currentFrame = 0;
        dogImage.src = frames[0];
    });
}

dog.addEventListener("pointerup", releaseDog);
dog.addEventListener("pointercancel", releaseDog);
dog.addEventListener("lostpointercapture", releaseDog);