/* =========================================================
   ARSLAN KHAN — CINEMATIC BIRTHDAY EXPERIENCE
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   SETTINGS
========================================================= */

/*
   Change this password to whatever you want.
*/
const SECRET_PASSWORD = "ARSLAN";


/* =========================================================
   PAGE DETECTION
========================================================= */

const currentPage =
    window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();


/* =========================================================
   PROTECTED PAGES
========================================================= */

const protectedPages = [
    "surprise.html",
    "memories.html",
    "letter.html",
    "wishes.html",
    "finale.html"
];


function protectPages() {

    if (
        protectedPages.includes(currentPage) &&
        sessionStorage.getItem("birthdayUnlocked") !== "true"
    ) {
        window.location.replace("index.html");
    }
}


protectPages();


/* =========================================================
   PASSWORD
========================================================= */

function unlockWebsite() {

    const input =
        document.getElementById("passwordInput");

    const message =
        document.getElementById("passwordMessage");

    if (!input) {
        return;
    }


    const enteredPassword =
        input.value.trim().toUpperCase();


    if (enteredPassword === SECRET_PASSWORD) {

        sessionStorage.setItem(
            "birthdayUnlocked",
            "true"
        );


        if (message) {

            message.textContent =
                "✓ Access granted. Your surprise is opening...";

            message.style.color =
                "#7CFFB2";
        }


        launchConfetti(70);


        setTimeout(() => {

            window.location.href =
                "surprise.html";

        }, 800);


    } else {

        if (message) {

            message.textContent =
                "✕ That's not the secret password.";

            message.style.color =
                "#ff7898";
        }


        input.value = "";

        input.focus();

        input.classList.remove("password-shake");

        void input.offsetWidth;

        input.classList.add("password-shake");
    }
}


/* =========================================================
   ENTER KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            const input =
                document.getElementById(
                    "passwordInput"
                );

            if (input) {
                unlockWebsite();
            }
        }

    }
);


/* =========================================================
   PASSWORD VISIBILITY
========================================================= */

function togglePassword() {

    const input =
        document.getElementById(
            "passwordInput"
        );

    const button =
        document.querySelector(
            ".password-eye"
        );


    if (!input) {
        return;
    }


    if (input.type === "password") {

        input.type = "text";

        if (button) {
            button.textContent = "🙈";
        }

    } else {

        input.type = "password";

        if (button) {
            button.textContent = "👁";
        }

    }
}


/* =========================================================
   COUNTDOWN + CURTAIN
========================================================= */

function startCinematicIntro() {

    const overlay =
        document.getElementById(
            "countdownOverlay"
        );

    const number =
        document.getElementById(
            "countdownNumber"
        );

    const leftCurtain =
        document.querySelector(
            ".curtain-left"
        );

    const rightCurtain =
        document.querySelector(
            ".curtain-right"
        );


    if (
        !overlay ||
        !number
    ) {
        return;
    }


    const sequence = [
        "3",
        "2",
        "1"
    ];


    let index = 0;


    function showNumber() {

        number.textContent =
            sequence[index];

        number.style.animation =
            "none";

        void number.offsetWidth;

        number.style.animation =
            "countdownPulse 1s ease";


        index++;


        if (index < sequence.length) {

            setTimeout(
                showNumber,
                1000
            );

        } else {

            setTimeout(() => {

                overlay.classList.add(
                    "hidden"
                );


                if (leftCurtain) {

                    leftCurtain.classList.add(
                        "open-left"
                    );
                }


                if (rightCurtain) {

                    rightCurtain.classList.add(
                        "open-right"
                    );
                }


                launchConfetti(100);

                setTimeout(() => {
                    startMusic();
                }, 800);


            }, 700);
        }
    }


    showNumber();
}


/* =========================================================
   START INTRO ONLY ON SURPRISE PAGE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (
            currentPage ===
            "surprise.html"
        ) {

            startCinematicIntro();
        }


        if (
            currentPage ===
            "finale.html"
        ) {

            setTimeout(() => {

                launchConfetti(100);

                createFireworks(5);

            }, 700);
        }

    }
);


/* =========================================================
   CONFETTI
========================================================= */

function launchConfetti(amount = 100) {

    let container =
        document.getElementById(
            "confetti-container"
        );


    if (!container) {

        container =
            document.createElement(
                "div"
            );

        container.id =
            "confetti-container";

        document.body.appendChild(
            container
        );
    }


    const colors = [
        "#FFD166",
        "#FF5C8A",
        "#7CFFCB",
        "#8E7CFF",
        "#FFFFFF",
        "#FF9F1C",
        "#FF70A6"
    ];


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );


        piece.className =
            "confetti-piece";


        piece.style.left =
            Math.random() * 100 + "vw";


        piece.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        piece.style.width =
            (5 + Math.random() * 7) +
            "px";


        piece.style.height =
            (10 + Math.random() * 13) +
            "px";


        piece.style.animationDuration =
            (2.5 + Math.random() * 3.5) +
            "s";


        piece.style.animationDelay =
            Math.random() * 0.8 +
            "s";


        container.appendChild(
            piece
        );


        setTimeout(() => {

            piece.remove();

        }, 6500);
    }
}


/* =========================================================
   FIREWORKS
========================================================= */

function createFireworks(numberOfFireworks = 4) {

    let container =
        document.getElementById(
            "fireworks-container"
        );


    if (!container) {

        container =
            document.createElement(
                "div"
            );

        container.id =
            "fireworks-container";

        document.body.appendChild(
            container
        );
    }


    for (
        let i = 0;
        i < numberOfFireworks;
        i++
    ) {

        setTimeout(() => {

            createSingleFirework(
                container
            );

        }, i * 500);
    }
}


function createSingleFirework(
    container
) {

    const centerX =
        15 +
        Math.random() * 70;

    const centerY =
        15 +
        Math.random() * 55;


    const colors = [
        "#FFD166",
        "#FF5C8A",
        "#7CFFCB",
        "#8E7CFF",
        "#FFFFFF"
    ];


    for (
        let i = 0;
        i < 30;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );


        particle.className =
            "firework-particle";


        particle.style.left =
            centerX + "vw";


        particle.style.top =
            centerY + "vh";


        particle.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            60 +
            Math.random() * 150;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        particle.style.setProperty(
            "--x",
            x + "px"
        );


        particle.style.setProperty(
            "--y",
            y + "px"
        );


        container.appendChild(
            particle
        );


        setTimeout(() => {

            particle.remove();

        }, 1300);
    }
}


/* =========================================================
   CELEBRATE BHAI
========================================================= */

function celebrateBhai() {

    launchConfetti(240);

    createFireworks(7);

    createFloatingHearts(35);

    startMusic();


    const button =
        document.querySelector(
            ".celebrate-main-button"
        );


    if (button) {

        button.innerHTML =
            "🎉 BHAI, LET THE CELEBRATION BEGIN! 🎉";
    }
}


/* =========================================================
   GRAND FINALE
========================================================= */

function grandFinale() {

    launchConfetti(350);

    createFireworks(12);

    createFloatingHearts(60);

    startMusic();


    const button =
        document.querySelector(
            ".final-celebration-button"
        );


    if (button) {

        button.textContent =
            "🎉 HAPPY BIRTHDAY, BHAI! 🎉";
    }
}


/* =========================================================
   FLOATING HEARTS
========================================================= */

function createFloatingHearts(
    amount = 25
) {

    const symbols = [
        "❤️",
        "💖",
        "💕",
        "💗",
        "✨",
        "💫"
    ];


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const heart =
            document.createElement(
                "div"
            );


        heart.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        heart.style.position =
            "fixed";


        heart.style.left =
            Math.random() * 100 +
            "vw";


        heart.style.bottom =
            "-40px";


        heart.style.fontSize =
            (18 +
                Math.random() * 24) +
            "px";


        heart.style.zIndex =
            "195";


        heart.style.pointerEvents =
            "none";


        heart.style.animation =
            "heartRise " +
            (3 +
                Math.random() * 3) +
            "s ease-out forwards";


        document.body.appendChild(
            heart
        );


        setTimeout(() => {

            heart.remove();

        }, 6500);
    }
}


/* =========================================================
   MUSIC
========================================================= */

let birthdayAudio = null;


function getBirthdayAudio() {

    if (!birthdayAudio) {

        birthdayAudio =
            document.getElementById(
                "birthdayMusic"
            );
    }


    return birthdayAudio;
}


function startMusic() {

    const audio =
        getBirthdayAudio();


    if (!audio) {
        return;
    }


    audio.volume = 0.65;


    const playPromise =
        audio.play();


    if (
        playPromise &&
        typeof playPromise.catch ===
            "function"
    ) {

        playPromise.catch(() => {

            /*
              Some browsers require the user
              to interact with the page first.
              The Music button can then be used.
            */

            updateMusicButton(false);

        });
    }


    updateMusicButton(true);
}


function toggleMusic() {

    const audio =
        getBirthdayAudio();


    if (!audio) {
        return;
    }


    if (audio.paused) {

        audio.volume = 0.65;

        audio.play()
            .then(() => {

                updateMusicButton(true);

            })
            .catch(() => {

                updateMusicButton(false);

            });

    } else {

        audio.pause();

        updateMusicButton(false);
    }
}


function updateMusicButton(
    isPlaying
) {

    const button =
        document.getElementById(
            "musicButton"
        );


    if (!button) {
        return;
    }


    button.textContent =
        isPlaying
            ? "🔊 Music On"
            : "🎵 Music Off";
}


/* =========================================================
   DYNAMIC ANIMATIONS
========================================================= */

const dynamicStyle =
    document.createElement(
        "style"
    );


dynamicStyle.textContent = `

@keyframes heartRise {

    0% {
        transform:
            translateY(0)
            scale(0.6)
            rotate(0deg);

        opacity: 0;
    }

    15% {
        opacity: 1;
    }

    100% {
        transform:
            translateY(-110vh)
            scale(1.2)
            rotate(35deg);

        opacity: 0;
    }
}


.password-shake {

    animation:
        passwordShake 0.45s ease;
}


@keyframes passwordShake {

    0%,
    100% {
        transform: translateX(0);
    }

    20% {
        transform: translateX(-8px);
    }

    40% {
        transform: translateX(8px);
    }

    60% {
        transform: translateX(-6px);
    }

    80% {
        transform: translateX(5px);
    }
}

`;

document.head.appendChild(
    dynamicStyle
);