const settingBoard = document.querySelector("#settingBoard");
const settingBackground = document.querySelector("#settingBackground");
const backgroundForm = document.querySelector("#backgkroundForm");
const settingBtn = document.querySelector("#settingBtn");

let settingClick = 0;

const BACKGROUNDS_LS = "backgrounds";


function drawBackgroundBoard() {
    //리스트업
    const backgroundTheme = ["Morocco", "Korea", "Germany", "Netherland", "Spain", "Switzerland"];
    //아이콘 만들기
    for (let i=0 ; i<backgroundTheme.length ; i++) {
        const div = document.createElement("div");
        const themeIcon = document.createElement("div");
        const themeDes = document.createElement("div");

        div.classList.add("theme");
        themeIcon.classList.add("theme-icon");
        themeDes.classList.add("theme-des");

        themeIcon.style = `background-image: url("img/${backgroundTheme[i]}/${backgroundTheme[i]}1.jpg")`;
        themeDes.textContent = backgroundTheme[i];
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
    drawSettingBoard();
    settingBtn.addEventListener("click", handleClickSetting);
    //backgroundForm.addEventListener("submit", handleClickBackgroundSubmit);

}

init();