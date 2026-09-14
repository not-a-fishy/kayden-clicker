let kdnScore = 0;
let clickStrength = 1;
let passiveKdn = 0;
let upgradeCount = [0];

const upgrades = [
    {
        upgrade: "1A3",
        cost: 20,
        normalInc: 1,
        clickInc: 0,
        limit: 32,
        flavourText: "You manage to get a whole class pissed off against one guy. Wow... (Upgrade Limit Reached)"
    },
    {
        upgrade: "Neon (cosmetic)",
        cost: 200,
        normalInc: 0,
        clickInc: 0,
        limit: 0,
        flavourText: "yay you get nice background",
        neon: true,
    },
    {
        upgrade: "Claude",
        cost: 2000,
        normalInc: 0,
        clickInc: 10,
        limit: 100,
        flavourText: "You ran out of money to buy claude tokens :( (Upgrade Limit Reached)"
    }
];

const clickButton = document.getElementById("kdn");
const clickTrackEl = document.getElementById("m");
const autoEl = document.getElementById("a");
const scoreEl = document.getElementById("scor");
const upgradeButton1 = document.getElementById("upg1");
const upgradeUi1 = document.getElementById("uppie1");
const bg = document.getElementById("bg");

clickButton.addEventListener('click', handleClick);
upgradeButton1.addEventListener('click', () => purchaseUpgrade(0));

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

    if (upgrades[index].neon === true) {
        bg.style.background = "linear-gradient(135deg, #b026ff, #ff44cc)";
        bg.style.boxShadow = "0 0 15px #ff44cc, 0 0 30px #b026ff";
        bg.style.color = "#ffffff";
    }

    kdnScore -= upgrade.cost;
    passiveKdn += upgrade.normalInc;
    clickStrength += upgrade.clickInc;
    upgradeCount[index] += 1;

    upgradeUi1.innerText = upgradeCount[index];
    scoreEl.innerText = kdnScore;
}

function handleClick() {
    kdnScore += clickStrength;
    scoreEl.innerText = kdnScore;
}

function update() {
    kdnScore += passiveKdn;
    scoreEl.innerText = kdnScore;
    autoEl.innerText = passiveKdn;
    clickTrackEl.innerText = clickStrength;
}

setInterval(update, 1000);
