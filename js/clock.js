const clockContainer = document.querySelector("#clock");

function getTime() {
    const date = new Date();
    const seconds = date.getSeconds();
    const minuates = date.getMinutes();
    const hours = date.getHours();
    clockContainer.innerText = `${hours < 10 ? `0${hours}` :hours} : ${minuates < 10 ? `0${minuates}` : minuates} : ${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();
