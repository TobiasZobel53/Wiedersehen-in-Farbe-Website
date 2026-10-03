// Emojis Array mit Gewichtung
const emojiList = [
    '🦢', '🦢','🦢',
    '🥐', '🥐',
    '🍓', '🍓',
    '🐇',
    '🕊️',
    '🐻',
    '🐸',
    '🌻'
];

// Saisonaler Emoji Array
const halloweenEmojiList = [
    '🎃',
    '👻',
    '🦇',
    '🕷️',
    '🕯️'
]

// Funktion zum Abfragen des Datums
function getActiveTargetInfo() {
    const now = new Date().getTime();
    const currentYear = new Date().getFullYear();

    const oct31Target = new Date(`${currentYear}-10-31T14:00:00+02:00`).getTime();
    const decNightTarget = new Date(`${currentYear}-12-14T00:00:00+01:00`).getTime();

    if (now < oct31Target) {
        return {
            stage: 1,
            targetDate: new Date(oct31Target),
            headline: "Bis wir uns wiedersehen",
            subHeadline: "sind es nur noch..."
        };
    }

    return {
        stage: 2,
        targetDate: new Date(decNightTarget),
        headline: "Bis zur magischen Sternennacht...",
        subHeadline: "Kein Wiedersehen aber das Gleiche sehen in der Nacht vom 13. auf den 14. Dezember 🌌"
    };
}

//  Definiert aktuell aktive Phase des Countdowns
let activeStage = -1;

// Funktion zur Berechnung der verbleibenen Zeit + Aktualisieren
function updateCountdown() {
    const targetInfo = getActiveTargetInfo();

    if (activeStage !== targetInfo.stage) {
        activeStage = targetInfo.stage;
        document.getElementById('main-headline').innerText = targetInfo.headline;
        document.getElementById('sub-headline').innerText = targetInfo.subHeadline;
    }

    const timeDiff = targetInfo.targetDate.getTime() - Date.now();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (timeDiff <= 0) {
        daysEl.innerText = "00";
        hoursEl.innerText = "00";
        minutesEl.innerText = "00";
        secondsEl.innerText = "00";
        return;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    daysEl.innerText = String(days).padStart(2, '0');
    hoursEl.innerText = String(hours).padStart(2, '0');
    minutesEl.innerText = String(minutes).padStart(2, '0');
    secondsEl.innerText = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Funktion um Zahlen Rotation zu randomisieren
function randomizeDigitTilt() {
    const digits = document.querySelectorAll('.countdown-digit');
    digits.forEach(digit => {
        const randomAngle = (Math.random() * 8 - 4).toFixed(1);
        digit.style.transform = `rotate(${randomAngle}deg)`;
        digit.style.display = 'inline-block';

        const label = digit.parentElement.querySelector('.countdown-label');
        if (label) {
            label.style.transform = `rotate(${randomAngle}deg)`;
        }
    });
}

// Funktion für die Animation: Emoji Hintergrund
function initFloatingEmoji() {
    const container = document.getElementById('emoji-background');
    if (!container) return;
    const totalEmojis = 20;

    // Beide Emoji-Listen für die Auswahl zusammenführen
    const combinedEmojiList = [...emojiList, ...halloweenEmojiList];

    for (let i = 0; i < totalEmojis; i++) {
        const span = document.createElement('span');
        span.className = 'floating-emoji';

        // Zufälliges Emoji aus der kombinierten Liste wählen
        const randomEmoji = combinedEmojiList[Math.floor(Math.random() * combinedEmojiList.length)];
        span.innerText = randomEmoji;

        const fontSize = (Math.random() * 2 + 1).toFixed(2);
        span.style.fontSize = `${fontSize}rem`;

        const leftPos = (Math.random() * 95).toFixed(2);
        span.style.left = `${leftPos}vw`;

        const duration = (Math.random() * 14 + 14).toFixed(2);
        span.style.setProperty('--duration', `${duration}s`);

        const negativeDelay = -(Math.random() * duration).toFixed(2);
        span.style.animationDelay = `${negativeDelay}s`;

        const opacity = (Math.random() * 0.35 + 0.35).toFixed(2);
        span.style.setProperty('--target-opacity', opacity);

        const driftX = ((Math.random() - 0.5) * 160).toFixed(0);
        span.style.setProperty('--drift-x', `${driftX}px`);

        const rotation = ((Math.random() - 0.5) * 120).toFixed(0);
        span.style.setProperty('--target-rotation', `${rotation}deg`);

        container.appendChild(span);
    }
}

// Ausführung der Funktionenn nach html aufruf
window.addEventListener('DOMContentLoaded', () => {
    initFloatingEmoji();
    randomizeDigitTilt();
});
