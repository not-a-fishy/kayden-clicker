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
        flavourText: "",
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
        label: "e4 im so good"
    },
    {
        upgrade: "Emoji",
        cost: 15000,
        normalInc: 0,
        clickInc: 0,
        limit: 1,
        flavourText: "",
        label: "emoji spam",
        emoji: true
    }
];

const clickButton = document.getElementById("kdn");
const clickTrackEl = document.getElementById("m");
const autoEl = document.getElementById("a");
const scoreEl = document.getElementById("scor");
const bg = document.getElementById("bg");
const upgradesContainer = document.getElementById("upgrades-container");

clickButton.addEventListener('click', handleClick);

const style = document.createElement("style");
style.textContent = `
    @keyframes fall {
        0% { transform: translateY(-50px); opacity: 1; }
        100% { transform: translateY(105vh); opacity: 0; }
    }
`;
document.head.appendChild(style);

buildUpgradeButtons();

let emoji = false;
const mostUsedEmojis = ["😂", "❤️", "🤣", "👍", "😭", "🙏", "😘", "🥰", "😍", "😊", "🎉", "✨"];

function randint(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function makeEmoji() {
    const div = document.createElement("div");
    const randomIndex = Math.floor(Math.random() * mostUsedEmojis.length);
    
    div.textContent = mostUsedEmojis[randomIndex];
    
    const fallDuration = randint(3, 6); 
    
    div.style = `
        position: fixed;
        left: ${randint(0, window.innerWidth - 30)}px;
        top: 0;
        font-size: ${randint(24, 48)}px;
        pointer-events: none;
        z-index: 9999;
        animation: fall ${fallDuration}s linear forwards;
    `;
    
    document.body.appendChild(div);
    
    setTimeout(() => {
        div.remove();
    }, fallDuration * 1000);
}

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
        return
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

    if (upgrade.emoji === true) emoji = true;

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

setInterval(() => {
    if (emoji) {
        makeEmoji();
    }
}, 300);

setInterval(update, 1000);
