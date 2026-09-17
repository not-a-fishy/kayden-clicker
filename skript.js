
let kdnScore = 0;
let clickStrength = 100000;
let passiveKdn = 0;
let upgradeCount = [];
let musicStarted = false;

let player = null;

function getVideo() {
    return document.getElementById("bavideo");
}

function autoStartOnReload() {
    const video = getVideo();
    if (!video) return;

    if (upgradeCount[8] > 0) {
        showVideo();
    }

    video.muted = true;

    video.play().then(() => {
        musicStarted = true;
    }).catch(() => {
        console.log("Video autoplay was blocked.");
    });

    const unmuteOnInteraction = () => {
        video.muted = false;
        video.play().catch(() => {});
        musicStarted = true;
        document.removeEventListener("click", unmuteOnInteraction);
    };

    document.addEventListener("click", unmuteOnInteraction);
}

function playYouTubeVideo() {
    const video = getVideo();
    if (!video) return;

    video.muted = false;

    video.play().then(() => {
        musicStarted = true;
    }).catch(() => {
        console.log("Video playback failed.");
    });
}

function showVideo() {
    const video = getVideo();

    if (video) {
        video.style.display = "block";
    }
}

function startMusic() {
    if (musicStarted) return;
    playYouTubeVideo();
}


const upgrades = [
    {
        upgrade: "1A3",
        cost: 20,
        normalInc: 1,
        clickInc: 0,
        limit: 32,
        flavourText: "You manage to get a whole class pissed off against one guy. Wow... (Upgrade Limit Reached)",
        label: "hire someone in 1A3 to harass Kayden"
    },
    {
        upgrade: "Watermark (cosmetic)",
        cost: 20,
        normalInc: 0,
        clickInc: 0,
        limit: 1,
        flavourText: "",
        label: "slap a watermark on everything",
        watermark: true
    },
    {
        upgrade: "Neon (cosmetic)",
        cost: 200,
        normalInc: 0,
        clickInc: 0,
        limit: 1,
        flavourText: "u alr got this",
        neon: true,
        label: "unlock a nice background"
    },
    {
        upgrade: "Claude",
        cost: 2000,
        normalInc: 0,
        clickInc: 10,
        limit: 100,
        flavourText: "You ran out of money to buy claude tokens :( (Upgrade Limit Reached)",
        label: "buy some Claude tokens"
    },
    {
        upgrade: "Chess Larp",
        cost: 15000,
        normalInc: 20,
        clickInc: 15,
        limit: 5,
        flavourText: "wow i love london system",
        label: "e4 im so good",
        chess: true
    },
    {
        upgrade: "Emoji",
        cost: 15000,
        normalInc: 0,
        clickInc: 0,
        limit: 1,
        flavourText: "u alr got this",
        label: "emoji spam",
        emoji: true
    },
    {
        upgrade: "Dragoon",
        cost: 15000,
        normalInc: 0,
        clickInc: 0,
        limit: 1,
        flavourText: "you met me at a very chinese time of my life",
        label: "dance",
        dragon: true
    },
    {
        upgrade: "Background Music",
        cost: 150000,
        normalInc: 10000,
        clickInc: 1000,
        limit: 1,
        flavourText: "u alr got this",
        label: "bg music :) (btw its bad apple music)",
        backgroundmusic: true
    },
    {
        upgrade: "Video",
        cost: 500000,
        normalInc: 1000,
        clickInc: 10000,
        limit: 1,
        flavourText: "u alr got this",
        label: "bad apple video",
        playvideo: true
    },
    {
        upgrade: "Kayden Plant Farm",
        cost: 10000000,
        normalInc: 10000000,
        clickInc: 0,
        limit: 100,
        flavourText: "I think you own too much land now RICH KID",
        label: "kayden likes some plants, give these plants to him and he will give you claude tokens."
    }
];


const clickButton = document.getElementById("kdn");
const clickTrackEl = document.getElementById("m");
const autoEl = document.getElementById("a");
const scoreEl = document.getElementById("scor");
const bg = document.getElementById("bg");
const upgradesContainer = document.getElementById("upgrades-container");

clickButton.addEventListener("click", handleClick);

let emoji = false;

const mostUsedEmojis = [
    "😂", "❤️", "🤣", "👍", "😭", "🙏",
    "😘", "🥰", "😍", "😊", "🎉", "✨"
];

const SAVE_KEY = "kaydenClickerSave";


function randint(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function makeEmoji() {
    const div = document.createElement("div");
    const randomIndex = Math.floor(
        Math.random() * mostUsedEmojis.length
    );

    div.textContent = mostUsedEmojis[randomIndex];
    div.className = "falling-emoji";

    const fallDuration = randint(3, 6);

    div.style.left = `${randint(0, window.innerWidth - 30)}px`;
    div.style.fontSize = `${randint(24, 48)}px`;
    div.style.animationDuration = `${fallDuration}s`;

    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, fallDuration * 1000);
}


function buildUpgradeButtons() {
    upgradesContainer.innerHTML = "";

    upgrades.forEach((upgrade, index) => {
        upgradeCount[index] = 0;

        const button = document.createElement("button");

        button.id = `upg${index}`;
        button.className = "uppies";

        button.innerHTML = `
            <b>${upgrade.upgrade}.</b>
            <b class="cost">
                Costs <b class="actcost">${beautify(upgrade.cost)}</b> Claude Tokens
            </b>
            ${upgrade.label}
            <b id="uppie${index}" class="amnt">0</b>
        `;

        button.addEventListener("click", () => {
            purchaseUpgrade(index);
        });

        upgradesContainer.appendChild(button);
    });
}


function purchaseUpgrade(index) {
    const upgrade = upgrades[index];
    const owned = upgradeCount[index];

    if (owned >= upgrade.limit) {
        alert(upgrade.flavourText);
        return;
    }

    if (kdnScore < upgrade.cost) {
        alert("Not enough Claude Tokens!");
        return;
    }

    if (upgrade.neon === true) {
        applyNeon();
    }

    if (upgrade.watermark === true) {
        applyWatermark();
    }

    if (upgrade.backgroundmusic === true) {
        startMusic();
    }

    if (upgrade.chess === true) {
        applychess();
    }

    if (upgrade.dragon === true) {
        applydragon();
    }

    if (upgrade.playvideo === true) {
        showVideo();
        playYouTubeVideo();
    }

    if (upgrade.emoji === true) {
        emoji = true;
    }

    kdnScore -= upgrade.cost;
    passiveKdn += upgrade.normalInc;
    clickStrength += upgrade.clickInc;
    upgradeCount[index] += 1;

    document.getElementById(`uppie${index}`).innerText =
        upgradeCount[index];

    scoreEl.innerText = beautify(kdnScore);

    saveGame();
}


function applyNeon() {
    if (bg) bg.classList.add("neon-bg");
}


function applyWatermark() {
    if (document.getElementById("watermark-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "watermark-overlay";

    document.body.appendChild(overlay);
}


function applychess() {
    if (document.getElementById("chess-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "chess-overlay";

    document.body.appendChild(overlay);
}


function applydragon() {
    if (document.getElementById("dragon-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "dragon-overlay";

    document.body.appendChild(overlay);
}


function handleClick() {
    if (upgradeCount[7] > 0 || upgradeCount[8] > 0) {
        startMusic();
    }

    kdnScore += clickStrength;

    scoreEl.innerText = beautify(kdnScore);

    saveGame();
}


function update() {
    kdnScore += passiveKdn;

    scoreEl.innerText = beautify(kdnScore);
    autoEl.innerText = beautify(passiveKdn);
    clickTrackEl.innerText = beautify(clickStrength);
}


function saveGame() {
    const saveData = {
        kdnScore,
        clickStrength,
        passiveKdn,
        upgradeCount,
        emoji
    };

    try {
        localStorage.setItem(
            SAVE_KEY,
            JSON.stringify(saveData)
        );
    } catch (e) {
        console.error("Failed to save game:", e);
    }
}


function loadGame() {
    let saveData;

    try {
        const raw = localStorage.getItem(SAVE_KEY);

        if (!raw) return;

        saveData = JSON.parse(raw);
    } catch (e) {
        console.error("Failed to load save:", e);
        return;
    }

    kdnScore = saveData.kdnScore ?? 0;
    clickStrength = saveData.clickStrength ?? 1;
    passiveKdn = saveData.passiveKdn ?? 0;
    emoji = saveData.emoji ?? false;

    if (Array.isArray(saveData.upgradeCount)) {
        saveData.upgradeCount.forEach((count, index) => {
            if (index < upgradeCount.length) {
                upgradeCount[index] = count;

                const uiEl = document.getElementById(`uppie${index}`);

                if (uiEl) {
                    uiEl.innerText = count;
                }
            }
        });
    }

    upgrades.forEach((upgrade, index) => {
        if (upgradeCount[index] > 0) {
            if (upgrade.neon) {
                applyNeon();
            }

            if (upgrade.watermark) {
                applyWatermark();
            }

            if (upgrade.chess) {
                applychess();
            }

            if (upgrade.dragon) {
                applydragon();
            }

            if (upgrade.backgroundmusic) {
                setTimeout(autoStartOnReload, 100);
            }

            if (upgrade.playvideo) {
                showVideo();
            }
        }
    });

    scoreEl.innerText = beautify(kdnScore);
    autoEl.innerText = beautify(passiveKdn);
    clickTrackEl.innerText = beautify(clickStrength);
}


const suffixes = [
    "", "k", "M", "B", "T",
    "Qa", "Qi", "Sx", "Sp", "Oc", "No",
    "Dc", "Ud", "Dd", "Td", "Qad", "Qid",
    "Sxd", "Spd", "Ocd", "Nod",
    "Vg", "Uvg", "Dvg", "Tvg", "Qavg", "Qivg",
    "Sxvg", "Spvg", "Ocvg", "Novg",
    "Tg", "Utg", "Dtg", "Ttg", "Qatg", "Qitg",
    "Sxtg", "Sptg", "Octg", "Notg",
    "Qag", "Uqag", "Dqag", "Tqag", "Qaqag", "Qiqag"
];


function beautify(num) {
    if (num === 0) return "0";

    const tier = Math.floor(
        Math.log10(Math.abs(num)) / 3
    );

    if (tier <= 0) return num.toString();

    if (tier >= suffixes.length) {
        return num.toExponential(2);
    }

    const value = num / Math.pow(1000, tier);

    return value
        .toFixed(2)
        .replace(/\.?0+$/, "") + suffixes[tier];
}


buildUpgradeButtons();
loadGame();


setInterval(() => {
    if (emoji) {
        makeEmoji();
    }
}, 300);

setInterval(update, 1000);
setInterval(saveGame, 5000);
