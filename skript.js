let kdnScore = 0;
let clickStrength = 100000;
let passiveKdn = 0;
let upgradeCount = [];
let musicStarted = false;

let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('bavideo', {
        events: {
            'onReady': () => {
                console.log("YouTube Player Loaded!");

                if (upgradeCount[7] > 0 || upgradeCount[6] > 0) {
                    autoStartOnReload();
                }
            },
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        player.playVideo();
    }
}

function autoStartOnReload() {
    if (!player || !player.playVideo) return;

    if (upgradeCount[7] > 0) {
        showVideo();
    }

    player.playVideo();
    musicStarted = true;

    setTimeout(() => {
        if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
            player.mute();
            player.playVideo();
            
            const unmuteOnInteraction = () => {
                player.unMute();
                player.playVideo();
                document.removeEventListener("click", unmuteOnInteraction);
            };
            document.addEventListener("click", unmuteOnInteraction);
        }
    }, 500);
}

function playYouTubeVideo() {
    if (player && player.playVideo) {
        player.unMute();
        player.playVideo();
        musicStarted = true;
    }
}

function showVideo() {
    const video = document.getElementById("bavideo");
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
        upgrade: "Background Music",
        cost: 150000,
        normalInc: 0,
        clickInc: 0,
        limit: 1,
        flavourText: "u alr got this",
        label: "bg music :) (btw its bad apple music)",
        backgroundmusic: true
    },
    {
        upgrade: "Video",
        cost: 500000,
        normalInc: 0,
        clickInc: 0,
        limit: 1,
        flavourText: "u alr got this",
        label: "bad apple video",
        playvideo: true
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
    const randomIndex = Math.floor(Math.random() * mostUsedEmojis.length);

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
                Costs <b class="actcost">${upgrade.cost}</b> Claude Tokens
            </b>
            ${upgrade.label}
            <b id="uppie${index}" class="amnt">0</b>
        `;

        button.addEventListener("click", () => purchaseUpgrade(index));

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

    document.getElementById(`uppie${index}`).innerText = upgradeCount[index];
    scoreEl.innerText = kdnScore;

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

function handleClick() {
    if (upgradeCount[6] > 0 || upgradeCount[7] > 0) {
        startMusic();
    }

    kdnScore += clickStrength;
    scoreEl.innerText = kdnScore;
    saveGame();
}

function update() {
    kdnScore += passiveKdn;

    scoreEl.innerText = kdnScore;
    autoEl.innerText = passiveKdn;
    clickTrackEl.innerText = clickStrength;
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
        localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
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
        }
    });

    scoreEl.innerText = kdnScore;
    autoEl.innerText = passiveKdn;
    clickTrackEl.innerText = clickStrength;
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
