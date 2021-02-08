const greetingText = document.querySelector("#greetingText");
const form = document.querySelector("#greetingForm");
const input = document.querySelector("#greetingInput");

const USER_LS = "userName";
const HIDE_CN = "hide";

function saveName(name) {
    localStorage.setItem(USER_LS, name);
}

function handleSubmit(event) {
    event.preventDefault();
    const name = input.value;
    paintGreeting(name);
    saveName(name);
}

function askForName() {
    greetingText.classList.add(HIDE_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(name) {
    form.classList.add(HIDE_CN);
    greetingText.classList.remove(HIDE_CN);
    greetingText.innerText = `Hello, ${name}`;
}

function loadName() {
    const userName = localStorage.getItem(USER_LS);
    if (userName == null) {
        askForName();
    }
    else {
        paintGreeting(userName);
    }
}

function init() {
    loadName();
}

init();