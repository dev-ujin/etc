const worldBtn = document.querySelector("#worldBtn");
const worldBoard = document.querySelector("#worldBoard");
const worldForm = document.querySelector("#worldForm");
const worldContent = document.querySelector("#worldContent");
const OW_API_KEY = "7b8adccf6fa5d5de6b821189b2574b14";
const WORLDS_LS = "worlds";
const BUFFER_LS = "worlds_buffer";

let worlds = [];
let buffer = [];
let worldClick = 0;

function saveWorlds() {
    localStorage.setItem(WORLDS_LS, JSON.stringify(worlds));
}
function saveBuffer() {
    localStorage.setItem(BUFFER_LS, JSON.stringify(buffer));
}
function filterWorld(id) {
    const cleanWorlds = worlds.filter(function(world) {
        return world.id !== id;
    });
    console.log(cleanWorlds);
    worlds = cleanWorlds;
    saveWorlds();
}

function parseWeather(json, world) {
    const dailyWeather = {
        id: world.id,
        lat: json.lat,
        lon: json.lon,
        utc: json.daily[0].dt,
        days: [
            {
                min_temp: json.daily[1].temp.min,
                max_temp: json.daily[1].temp.max,
                main: json.daily[1].weather[0].main,
                icon: json.daily[1].weather[0].icon
            },
            {
                min_temp: json.daily[2].temp.min,
                max_temp: json.daily[2].temp.max,
                main: json.daily[2].weather[0].main,
                icon: json.daily[2].weather[0].icon
            },
            {
                min_temp: json.daily[3].temp.min,
                max_temp: json.daily[3].temp.max,
                main: json.daily[3].weather[0].main,
                icon: json.daily[3].weather[0].icon
            },
            {
                min_temp: json.daily[4].temp.min,
                max_temp: json.daily[4].temp.max,
                main: json.daily[4].weather[0].main,
                icon: json.daily[4].weather[0].icon
            },
            {
                min_temp: json.daily[5].temp.min,
                max_temp: json.daily[5].temp.max,
                main: json.daily[5].weather[0].main,
                icon: json.daily[5].weather[0].icon
            },
            {
                min_temp: json.daily[6].temp.min,
                max_temp: json.daily[6].temp.max,
                main: json.daily[6].weather[0].main,
                icon: json.daily[6].weather[0].icon 
            },
            {
                min_temp: json.daily[7].temp.min,
                max_temp: json.daily[7].temp.max,
                main: json.daily[7].weather[0].main,
                icon: json.daily[7].weather[0].icon
            },
        ]
    }
    return dailyWeather;
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

function getTimeFromOffset(offset) {
    let now = new Date();
    const timeZone = now.getTime() + (now.getTimezoneOffset() * 60000) + (offset * 3600000);
    now.setTime(timeZone);

    const time = {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        date: now.getDate(),
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds()
    };
    return time;
}

function getWeather(world, currentDes, currentIcon, li) {
    fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${world.lat}&lon=${world.lon}&exclude=minutely,hourly,alerts&appid=${OW_API_KEY}&units=metric`
    ).then(function(response) {
        return response.json();
    })
    .then(function(json) {
        //console.log(json);
        currentDes.textContent = `${json.current.temp}`;
        currentIcon.appendChild(currentDes);
        currentIcon.style = `background-image: url("http://openweathermap.org/img/wn/${json.current.weather[0].icon}@2x.png");`;
            
        const parsedWorlds = JSON.parse(localStorage.getItem(BUFFER_LS));
        parsedWorlds.forEach(function (parsedWorld) {
            //console.log(world.id);
            if (world.id === parsedWorld.id) {
            //if ((world.lat === json.lat) && (world.lon === json.lon)) {
                if (parsedWorld.utc === json.daily[0].dt) {
                    for (let i=0 ; i<7 ; i++) {
                        //console.log("her");
                        const daily = document.createElement("div");
                        const dailyDes = document.createElement("div");
                        daily.classList.add("daily-icon");
                        dailyDes.classList.add("daily-des");
                        dailyDes.textContent = `⬇️${parsedWorld.days[i].min_temp}\n⬆️${parsedWorld.days[i].max_temp}`;
                        
                        daily.style = `background-image: url("http://openweathermap.org/img/wn/${parsedWorld.days[i].icon}@2x.png")`;
                        
                        daily.appendChild(dailyDes);
                        li.appendChild(daily);
                    }
                }
                else {
                    filterWorld(parsedWorld.id);
                    buffer.push(parseWeather(json, world));
                    saveBuffer();
                }
            }
        });
    });
}

function paintWorld(world) {
    //1. current 날씨 정보 : city_name, time, date
    //2. 일주일치 날씨 : date, icon
    const timeObj = getTimeFromOffset(world.timezone_offset / 3600);
    const li = document.createElement("div");
    const cityName = document.createElement("div");
    const time = document.createElement("div");
    const currentIcon = document.createElement("div");
    const currentDes = document.createElement("div");
    

    li.classList.add("world");
    cityName.classList.add("world-city-name");
    time.classList.add("world-time");
    currentIcon.classList.add("current-icon");
    currentDes.classList.add("current-des");

    cityName.textContent = world.city_name;
    time.textContent = `${timeObj.hours < 10 ? `0${timeObj.hours}` : timeObj.hours} : ${timeObj.minutes < 10 ? `0${timeObj.minutes}` : timeObj.minutes}`;
    
    

    li.appendChild(cityName);
    li.appendChild(time);
    getWeather(world, currentDes, currentIcon, li);

    li.appendChild(currentIcon);
    //li.appendChild(currentDes);
    worldContent.appendChild(li);
    //isExistInBuffer()

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



function getTimeZone(oldWorld) {
    fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${oldWorld.lat}&lon=${oldWorld.lon}&exclude=minutely,hourly,alerts&appid=${OW_API_KEY}&units=metric`
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
        //console.log(json);
        filterWorld(oldWorld.id);
        worlds.push(world);
        saveWorlds();
        const dailyWeather = parseWeather(json, world);
        buffer.push(dailyWeather);
        saveBuffer();
        paintWorld(world);
    });

    
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
            lon: json[0].lon,
        };
        //console.log("heyyy");
        //console.log(world.name);
        worlds.push(world);
        saveWorlds();
        getTimeZone(world);
        //paintWorld(world);
    });
}

function handleSubmitWorld(event) {
    event.preventDefault();
    const worldInput = document.querySelector("#worldInput");
    getGeolocation(worldInput.value);
}

function init() {
    getData(WORLDS_LS, worlds);
    getData(BUFFER_LS, buffer);
    drawWorldBoard();
    worldBtn.addEventListener("click", handleClickWorld);
    worldForm.addEventListener("submit", handleSubmitWorld);
    
}

init();