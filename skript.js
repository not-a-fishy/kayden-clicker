let kdnscore = 0;
let clickstr = 1;
let passivekdn = 0;

const button = document.getElementById("kdn");
const clicktrack = document.getElementById("m");
const auto = document.getElementById("a");
const score = document.getElementById("scor");
const button1 = document.getElementById("upg1");

button.addEventListener('click', hi);
button1.addEventListener('click', tryupgrade);

function tryupgrade(){
    alert("trying to upgrade!")
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
