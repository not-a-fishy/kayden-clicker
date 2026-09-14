let kdnscore = 0;
let clickstr = 1;
let passivekdn = 0;
let upgamt = ["NA", 0]

const upgrades = [
    "this text is here to distract you why are u looking at it",
    {
        upgrade: "1A3",
        cost: 20,
        normalinc: 1,
        clickinc: 0,
        limit: 32,
        flavourText: "You manage to get a whole class pissed off against one guy. Wow... (Upgrade Limit Reached) "
    }
]
const button = document.getElementById("kdn");
const clicktrack = document.getElementById("m");
const auto = document.getElementById("a");
const score = document.getElementById("scor");
const button1 = document.getElementById("upg1");
const ui1 = document.getElementById("uppie1");

button.addEventListener('click', hi);
button1.addEventListener('click', () => upgrade(1));

function upgrade(type){
    if (kdnscore >= upgrades[type]["cost"] && upgamt[type]<upgrades[type]["limit"]){ 
        kdnscore -= upgrades[type]["cost"];
        passivekdn += upgrades[type]["normalinc"];
        clickstr += upgrades[type]["clickinc"];
        upgamt[type] += 1;
    } else if (upgamt[type]>=upgrades[type]["limit"]) {
        alert(upgrades[type]["flavourText"]);
    } else {
        alert("Not enough Claude Tokens!");
    }
    ui1.innerText = upgamt[1];

}


function hi(){
    kdnscore += clickstr;
    scor.innerText = kdnscore;
}
function update(){
    kdnscore += passivekdn;
    scor.innerText = kdnscore;
    auto.innerText = passivekdn;
    clicktrack.innerText = clickstr;
}

setInterval(update, 1000)
