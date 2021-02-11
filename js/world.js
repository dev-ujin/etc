const worldBtn = document.querySelector("#worldBtn");
const worldBoard = document.querySelector("#worldBoard");
const worldForm = document.querySelector("#worldForm");
const OW_API_KEY = "";
const WORLDS_LS = "worlds";

let worlds = [];
let worldClick = 0;

function saveWorlds() {
    localStorage.setItem(WORLDS_LS, JSON.stringify(worlds));
}
function filterWorld(id) {
    const cleanWorlds = worlds.filter(function(world) {
        return world.id !== parseInt(id);
    });
    worlds = cleanWorlds;
    saveWorlds();
}
function handleClickWorld() {
    if (worldClick === 0) {
        worldClick = 1;
        worldBoard.classList.remove(HIDE);
        worldBoard.classList.add(SHOW);
    }
    else if(worldClick === 1) {
        worldClick = 0;
        worldBoard.classList.remove(SHOW);
        worldBoard.classList.add(HIDE);
    }
}

function paintWorld(world) {
}

function loadWorlds() {
    const parsedWorlds = JSON.parse(localStorage.getItem(WORLDS_LS));
    if (parsedWorlds !== null) {
        parsedWorlds.forEach(function(world) {
        paintWorld(world);
        });
    }
}

function drawWorldBoard() {
    loadWorlds();
    worldBoard.classList.add(HIDE);
}

function getGeolocation(cityName) {
    fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${OW_API_KEY}`
    ).then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const world = {
            id: worlds.length + 1,
            name: json[0].name,
            lat: json[0].lat,
            lon: json[0].lon
        };
        console.log(world);
        worlds.push(world);
        saveWorlds();
        getTime(world);
    });
    
}

function getTime(oldWorld) {
    fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${oldWorld.lat}&lon=${oldWorld.lon}&exclude=minutely,hourly,alerts&appid=${OW_API_KEY}`
    ).then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const world = {
            id: oldWorld.id,
            city_name: oldWorld.name,
            lat: oldWorld.lat,
            lon: oldWorld.lon,
            timezone: json.timezone,
            timezone_offset: json.timezone_offset,
        };
        filterWorld(oldWorld.id);
        worlds.push(world);
        saveWorlds(worlds);
    });
    
}
function findWorldByName(cityName) {
    const parsedWorlds = JSON.parse(localStorage.getItem(WORLDS_LS));
    if (parsedWorlds != null) {
        parsedWorlds.forEach(function (parsedWorld) {
            if (parsedWorld.city_name == cityName) {
                const world = {
                    id: parsedWorld.id,
                    city_name: parsedWorld.city_name,
                    lat: parsedWorld.lat,
                    lon: parsedWorld.lon,
                    timezone: parsedWorld.timezone,
                    timezone_offset: parsedWorld.timezone_offset
                };
                return world;
            }
        });
    }
}

function handleSubmitWorld(event) {
    event.preventDefault();
    const worldInput = document.querySelector("#worldInput");
    getGeolocation(worldInput.value);
    paintWorld(findWorldByName(worldInput.value));
}

function init() {
    getData(WORLDS_LS, worlds);
    drawWorldBoard();
    worldBtn.addEventListener("click", handleClickWorld);
    worldForm.addEventListener("submit", handleSubmitWorld);
    
}

init();