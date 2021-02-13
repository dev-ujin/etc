const settingBoard = document.querySelector("#settingBoard");
const settingBackground = document.querySelector("#settingBackground");
const settingBtn = document.querySelector("#settingBtn");
const body = document.querySelector("body");

let settingClick = 0;

const BACKGROUND_LS = "background";
const THEME = ["Morocco", "Korea", "Germany", "Netherland", "Spain", "Switzerland", "Japan", "Czech"];
const IMG_NUM = 5;


function getRandom() {
    const number = Math.floor(Math.random() * IMG_NUM);
    return number;
}

function paintBackground() {
    const themeSelected = localStorage.getItem(BACKGROUND_LS);
    console.log(themeSelected);
    if (themeSelected !== null) {
        const randomNumber = getRandom();
    body.style = `background-image: url("img/${themeSelected}/${themeSelected}${randomNumber + 1}.jpg");`;
    }
    else {
        body.style = 'background-image: url("img/default.jpg")';
    }
}

function handleClickTheme (event) {
    const themes = document.querySelectorAll(".theme");
    const themeSelected = event.target.parentNode;
    themes.forEach(function (theme) {
        if (theme.id !== themeSelected.id) {
            theme.classList.remove("theme-selected");
        }
        else {
            theme.classList.add("theme-selected");
        }
    });
    localStorage.setItem(BACKGROUND_LS, themeSelected.id);
    paintBackground();
}

function drawBackgroundBoard() {
    const themeSelected = localStorage.getItem(BACKGROUND_LS);
    console.log(themeSelected);
    for (let i=0 ; i<THEME.length ; i++) {
        const div = document.createElement("div");
        const themeIcon = document.createElement("div");
        const themeDes = document.createElement("div");

        div.classList.add("theme");
        div.id = THEME[i];
        themeIcon.classList.add("theme-icon");
        themeDes.classList.add("theme-des");
        if (themeSelected === THEME[i]) {
            div.classList.add("theme-selected");
        }

        themeIcon.style = `background-image: url("img/${THEME[i]}/${THEME[i]}1.jpg")`;
        themeDes.textContent = THEME[i];
        div.addEventListener("click", handleClickTheme);

        div.appendChild(themeIcon);
        div.appendChild(themeDes);
        settingBackground.appendChild(div);
    }
}

function drawSettingBoard() {
    drawBackgroundBoard();
    settingBoard.classList.add(HIDE);
}

function handleClickSetting() {
    if (settingClick === 0) {
        settingClick = 1;
        settingBoard.classList.remove(HIDE);
        settingBoard.classList.add(SHOW);
    }
    else if (settingClick === 1) {
        settingClick = 0;
        settingBoard.classList.remove(SHOW);
        settingBoard.classList.add(HIDE);

    }
}

function init() {
    paintBackground();
    drawSettingBoard();
    settingBtn.addEventListener("click", handleClickSetting);

}

init();