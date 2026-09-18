let kdnScore = 0;
let clickStrength = 1;
let passiveKdn = 0;
let upgradeCount = [];
let musicStarted = false;
let inflationMultiplier = 1;
let player = null;

const SAVE_KEY = "kaydenClickerSaveV2";
const RESET_VERSION = "3";

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
        clickInc: 100,
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
        clickInc: 1000,
        limit: 100,
        flavourText: "You ran out of money to buy claude tokens :( (Upgrade Limit Reached)",
        label: "buy some Claude tokens"
    },
    {
        upgrade: "Finger Training",
        cost: 5000,
        normalInc: 0,
        clickInc: 5000,
        limit: 25,
        flavourText: "your finger is actually getting kinda strong bro (Upgrade Limit Reached)",
        label: "go to the gym but only for your finger"
    },
    {
        upgrade: "Chess Larp",
        cost: 15000,
        normalInc: 20,
        clickInc: 15000,
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
        upgrade: "Better Mouse",
        cost: 50000,
        normalInc: 0,
        clickInc: 50000,
        limit: 25,
        flavourText: "bro bought a better mouse just to click kayden (Upgrade Limit Reached)",
        label: "buy a mouse that clicks harder"
    },
    {
        upgrade: "Dragoon",
        cost: 75000,
        normalInc: 0,
        clickInc: 0,
        limit: 1,
        flavourText: "you met me at a very chinese time of my life",
        label: "dance",
        dragon: true
    },
    {
        upgrade: "Click Assistant",
        cost: 150000,
        normalInc: 50000,
        clickInc: 150000,
        limit: 25,
        flavourText: "he literally does nothing except click the button (Upgrade Limit Reached)",
        label: "hire someone to click kayden"
    },
    {
        upgrade: "Background Music",
        cost: 500000,
        normalInc: 10000,
        clickInc: 500000,
        limit: 1,
        flavourText: "u alr got this",
        label: "bg music :) (btw its bad apple music)",
        backgroundmusic: true
    },
    {
        upgrade: "Video",
        cost: 1500000,
        normalInc: 1000,
        clickInc: 2000000,
        limit: 1,
        flavourText: "u alr got this",
        label: "bad apple video",
        playvideo: true
    },
    {
        upgrade: "Gaming Mouse",
        cost: 5000000,
        normalInc: 0,
        clickInc: 10000000,
        limit: 20,
        flavourText: "wow rgb makes you click faster apparently (Upgrade Limit Reached)",
        label: "buy a mouse with 9000 dpi"
    },
    {
        upgrade: "Kayden Plant Farm",
        cost: 10000000,
        normalInc: 10000000,
        clickInc: 5000000,
        limit: 100,
        flavourText: "I think you own too much land now RICH KID",
        label: "kayden likes some plants, give these plants to him and he will give you claude tokens."
    },
    {
        upgrade: "Click Assistant 2",
        cost: 25000000,
        normalInc: 10000000,
        clickInc: 25000000,
        limit: 25,
        flavourText: "bro hired ANOTHER guy to click kayden (Upgrade Limit Reached)",
        label: "hire another guy to click kayden"
    },
    {
        upgrade: "Kayden Mining Corporation",
        cost: 50000000,
        normalInc: 50000000,
        clickInc: 25000000,
        limit: 50,
        flavourText: "The entire economy is now dependent on Kayden. (Upgrade Limit Reached)",
        label: "mine Claude Tokens from the ground"
    },
    {
        upgrade: "Click Factory",
        cost: 150000000,
        normalInc: 25000000,
        clickInc: 150000000,
        limit: 50,
        flavourText: "you have an entire factory dedicated to clicking a button (Upgrade Limit Reached)",
        label: "industrialise the kayden clicking process"
    },
    {
        upgrade: "Kayden Bank",
        cost: 250000000,
        normalInc: 100000000,
        clickInc: 100000000,
        limit: 25,
        flavourText: "The bank has collapsed. Somehow you still got the tokens. (Upgrade Limit Reached)",
        label: "open a completely legitimate bank"
    },
    {
        upgrade: "Quantum Kayden",
        cost: 1000000000,
        normalInc: 500000000,
        clickInc: 1000000000,
        limit: 10,
        flavourText: "There are now multiple Kaydens. This is probably bad. (Upgrade Limit Reached)",
        label: "split Kayden into several dimensions"
    },
    {
        upgrade: "Click Empire",
        cost: 5000000000,
        normalInc: 0,
        clickInc: 5000000000,
        limit: 25,
        flavourText: "you own the global clicking industry now congratulations (Upgrade Limit Reached)",
        label: "buy every clicker factory on earth"
    },
    {
        upgrade: "Time Machine",
        cost: 10000000000,
        normalInc: 2000000000,
        clickInc: 10000000000,
        limit: 5,
        flavourText: "You went back in time and bought this earlier. Somehow. (Upgrade Limit Reached)",
        label: "go back 10 seconds and buy yourself a Time Machine"
    },
    {
        upgrade: "Super Click",
        cost: 50000000000,
        normalInc: 0,
        clickInc: 50000000000,
        limit: 20,
        flavourText: "that click was kinda crazy ngl (Upgrade Limit Reached)",
        label: "click harder"
    },
    {
        upgrade: "Inflation",
        cost: 100000000000,
        normalInc: 10000000000,
        clickInc: 50000000000,
        limit: 1,
        flavourText: "Everything costs 50% more now.",
        label: "destroy the value of Claude Tokens",
        inflation: true
    },
    {
        upgrade: "Click Reactor",
        cost: 500000000000,
        normalInc: 0,
        clickInc: 500000000000,
        limit: 10,
        flavourText: "why is the click reactor glowing (Upgrade Limit Reached)",
        label: "power the click with nuclear energy"
    },
    {
        upgrade: "Kayden AI",
        cost: 1000000000000,
        normalInc: 100000000000,
        clickInc: 1000000000000,
        limit: 10,
        flavourText: "It has been trained exclusively on Kayden lore. (Upgrade Limit Reached)",
        label: "deploy an unnecessarily large model"
    },
    {
        upgrade: "AGI Kayden",
        cost: 10000000000000,
        normalInc: 1000000000000,
        clickInc: 10000000000000,
        limit: 5,
        flavourText: "Nobody knows what it does anymore. (Upgrade Limit Reached)",
        label: "achieve artificial general Kayden intelligence"
    },
    {
        upgrade: "Click Singularity",
        cost: 50000000000000,
        normalInc: 0,
        clickInc: 50000000000000,
        limit: 10,
        flavourText: "you clicked so hard you broke spacetime (Upgrade Limit Reached)",
        label: "put the entire universe into one click"
    },
    {
        upgrade: "Kayden Dyson Sphere",
        cost: 100000000000000,
        normalInc: 10000000000000,
        clickInc: 100000000000000,
        limit: 3,
        flavourText: "You have harvested an entire star. Please stop. (Upgrade Limit Reached)",
        label: "surround a star with Kayden infrastructure"
    },
    {
        upgrade: "Reality Engine",
        cost: 1000000000000000,
        normalInc: 100000000000000,
        clickInc: 1000000000000000,
        limit: 1,
        flavourText: "Reality has been successfully monetised.",
        label: "turn the universe into Claude Tokens"
    },
    {
        upgrade: "THE BUTTON",
        cost: 10000000000000000,
        normalInc: 0,
        clickInc: 10000000000000000,
        limit: 1,
        flavourText: "u alr got this",
        label: "click the funny button"
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

    div.style.left = `${randint(0, Math.max(1, window.innerWidth - 30))}px`;
    div.style.fontSize = `${randint(24, 48)}px`;
    div.style.animationDuration = `${fallDuration}s`;

    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, fallDuration * 1000);
}


function getUpgradeCost(upgrade) {
    return Math.floor(upgrade.cost * inflationMultiplier);
}


function buildUpgradeButtons() {
    upgradesContainer.innerHTML = "";

    upgrades.forEach((upgrade, index) => {
        upgradeCount[index] ??= 0;

        const button = document.createElement("button");

        button.id = `upg${index}`;
        button.className = "uppies";

        button.innerHTML = `
            <b>${upgrade.upgrade}.</b>
            <b class="cost">
                Costs <b class="actcost">${beautify(getUpgradeCost(upgrade))}</b> Claude Tokens
            </b>
            ${upgrade.label}
            <b id="uppie${index}" class="amnt">${upgradeCount[index]}</b>
        `;

        button.addEventListener("click", () => {
            purchaseUpgrade(index);
        });

        upgradesContainer.appendChild(button);
    });
}


function refreshUpgradeCosts() {
    upgrades.forEach((upgrade, index) => {
        const costEl = document.querySelector(`#upg${index} .actcost`);

        if (costEl) {
            costEl.innerText = beautify(getUpgradeCost(upgrade));
        }
    });
}


function purchaseUpgrade(index) {
    const upgrade = upgrades[index];
    const owned = upgradeCount[index] ?? 0;
    const actualCost = getUpgradeCost(upgrade);

    if (owned >= upgrade.limit) {
        if (upgrade.flavourText) {
            alert(upgrade.flavourText);
        }
        return;
    }

    if (kdnScore < actualCost) {
        alert("Not enough Claude Tokens!");
        return;
    }

    kdnScore -= actualCost;

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

    if (upgrade.inflation === true) {
        inflationMultiplier *= 1.5;
    }

    passiveKdn += upgrade.normalInc;
    clickStrength += upgrade.clickInc;
    upgradeCount[index] += 1;

    document.getElementById(`uppie${index}`).innerText =
        upgradeCount[index];

    scoreEl.innerText = beautify(kdnScore);

    refreshUpgradeCosts();
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
        emoji,
        inflationMultiplier
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
    clickStrength = saveData.clickStrength ?? 100000;
    passiveKdn = saveData.passiveKdn ?? 0;
    emoji = saveData.emoji ?? false;
    inflationMultiplier = saveData.inflationMultiplier ?? 1;

    if (Array.isArray(saveData.upgradeCount)) {
        saveData.upgradeCount.forEach((count, index) => {
            if (index < upgrades.length) {
                upgradeCount[index] = count;

                const uiEl = document.getElementById(`uppie${index}`);

                if (uiEl) {
                    uiEl.innerText = count;
                }
            }
        });
    }

    upgrades.forEach((upgrade, index) => {
        if ((upgradeCount[index] ?? 0) > 0) {
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

    refreshUpgradeCosts();
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


if (localStorage.getItem("kaydenClickerResetVersion") !== RESET_VERSION) {
    localStorage.clear();
    localStorage.setItem("kaydenClickerResetVersion", RESET_VERSION);
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
