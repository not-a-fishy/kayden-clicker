let kdnScore = 0;
let clickStrength = 1;
let passiveKdn = 0;
let upgradeCount = [];

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
        upgrade: "Neon (cosmetic)",
        cost: 200,
        normalInc: 0,
        clickInc: 0,
        limit: 1,
        flavourText: "yay you get nice background",
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
        cost: 15000*(upgradeCount+1),
        normalInc: 20,
        clickInc: 15,
        limit: 5,
        flavourText: "wow i love london system",
        label: "e4"
    }
];

const clickButton = document.getElementById("kdn");
const clickTrackEl = document.getElementById("m");
const autoEl = document.getElementById("a");
const scoreEl = document.getElementById("scor");
const bg = document.getElementById("bg");
const upgradesContainer = document.getElementById("upgrades-container");

clickButton.addEventListener('click', handleClick);

buildUpgradeButtons();

function buildUpgradeButtons() {
    upgrades.forEach((upgrade, index) => {
        upgradeCount[index] = 0;

        const button = document.createElement("button");
        button.id = `upg${index}`;
        button.className = "uppies";
        button.innerHTML = `
            <b>${upgrade.upgrade}.</b>
            <b class="cost">Costs <b class="actcost">${upgrade.cost}</b> Claude Tokens</b>
            ${upgrade.label}
            <b id="uppie${index}" class="amnt">0</b>
        `;

        button.addEventListener('click', () => purchaseUpgrade(index));
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
        bg.style.background = "linear-gradient(135deg, #b026ff, #ff44cc)";
        bg.style.boxShadow = "0 0 15px #ff44cc, 0 0 30px #b026ff";
        bg.style.color = "#ffffff";
    }

    kdnScore -= upgrade.cost;
    passiveKdn += upgrade.normalInc;
    clickStrength += upgrade.clickInc;
    upgradeCount[index] += 1;

    document.getElementById(`uppie${index}`).innerText = upgradeCount[index];
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
