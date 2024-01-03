const DAY_NAME_OF_WEEK_LONG = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const locationSearch = document.querySelector("#location-search");
const searchTable = document.querySelector("#result-table");
const table = document.querySelector("#table");

// ===================================================
// ===================================================
// ===================================================
// ===================================================
// ===================================================
// ==========
// today
// ==========

let city = document.querySelector("#today_city");
let todayTemp = document.querySelector("#today_temp");
let todayDay = document.querySelector("#today_day");
let todayDate = document.querySelector("#today_date");
let todayConditionImg = document.querySelector("#today_condition_icon");
let todayConditionText = document.querySelector("#today_condition_text");
let todayRain = document.querySelector("#rain_precentage");
let todayWind = document.querySelector("#wind_speed");
let todayWindDegree = document.querySelector("#wind_dir");

// ==========
// tommorow
// ==========

let tommorowDay = document.querySelector("#tommorrow_day");
let tommorowMaxTemp = document.querySelector("#tommorrow_max");
let tommorowMinTemp = document.querySelector("#tommorrow_min");
let tommorowConditionImg = document.querySelector("#tommorrow_img");
let tommorowConditionText = document.querySelector("#tommorrow_comment");

// ==========
// day after tommorow
// ==========

let afterTommorowDay = document.querySelector("#after_tommorrow_day");
let afterTommorowMaxTemp = document.querySelector("#after_tommorrow_max");
let afterTommorowMinTemp = document.querySelector("#after_tommorrow_min");
let afterTommorowConditionImg = document.querySelector("#after_tommorrow_img");
let afterTommorowConditionText = document.querySelector(
  "#after_tommorrow_comment"
);

// ===================================================
// ===================================================
// ===================================================
// ===================================================
// ===================================================

async function getLocations(text) {
  fetch(
    `https://api.weatherapi.com/v1/search.json?key=d0fda70a3b8249b194a72202240101&q=${text}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);

        const id = data[i].id;
        var row = document.createElement("tr");
        var serial = document.createElement("td");
        var location = document.createElement("td");
        var command = document.createElement("td");
        var btn = document.createElement("button");
        btn.setAttribute("class", "btn btn-outline-info rounded-5");
        btn.innerHTML = `Choose`;
        btn.addEventListener("click", (eventInfo) => {
          getLocationsData(id);
          console.log(id);
        });
        serial.append(i + 1);
        location.append(data[i].name + ", " + data[i].country);
        command.append(btn);
        row.append(serial);
        row.append(location);
        row.append(command);

        searchTable.append(row);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function clearTable() {
  searchTable.innerHTML = "";
}

locationSearch.addEventListener("keyup", (eventInfo) => {
  clearTable();

  if (eventInfo.target.value < 3) {
    table.classList.add("d-none");
  } else {
    table.classList.remove("d-none");
    getLocations(eventInfo.target.value);
  }
});

async function getLocationsData(locationId) {
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=d0fda70a3b8249b194a72202240101&q=id:${locationId}&days=3`
  )
    .then((response) => response.json())
    .then((data) => {
      clearTable();
      locationSearch.value = "";

      let weather = {
        current: {
          location: data.location.name,
          temp: data.current.temp_c,
          condition: data.current.condition,
          wind: data.current.wind_kph,
          windDir: data.current.wind_dir,
          date: data.forecast.forecastday[0].date,
          day: DAY_NAME_OF_WEEK_LONG[
            new Date(data.forecast.forecastday[0].date).getDay()
          ],
          rain: data.forecast.forecastday[0].day.daily_chance_of_rain,
        },
        tommorow: {
          date: data.forecast.forecastday[1].date,
          day: DAY_NAME_OF_WEEK_LONG[
            new Date(data.forecast.forecastday[1].date).getDay()
          ],
          maxTemp: data.forecast.forecastday[1].day.maxtemp_c,
          minTemp: data.forecast.forecastday[1].day.mintemp_c,
          condition: data.forecast.forecastday[1].day.condition,
        },
        dayAfterTommorow: {
          date: data.forecast.forecastday[2].date,
          day: DAY_NAME_OF_WEEK_LONG[
            new Date(data.forecast.forecastday[2].date).getDay()
          ],
          maxTemp: data.forecast.forecastday[2].day.maxtemp_c,
          minTemp: data.forecast.forecastday[2].day.mintemp_c,
          condition: data.forecast.forecastday[2].day.condition,
        },
      };

      // =======================
      // today
      // =======================

      city.textContent = weather.current.location;
      todayTemp.textContent = weather.current.temp;
      todayDay.textContent = weather.current.day;
      todayDate.textContent = weather.current.date;
      todayConditionImg.src = weather.current.condition.icon;
      todayConditionText.textContent = weather.current.condition.text;
      todayRain.textContent = weather.current.rain;
      todayWind.textContent = weather.current.wind;
      todayWindDegree.textContent = weather.current.windDir;

      // =======================
      // tomorrow
      // =======================

      tommorowDay.textContent = weather.tommorow.day;
      tommorowMaxTemp.textContent = weather.tommorow.maxTemp;
      tommorowMinTemp.textContent = weather.tommorow.minTemp;
      tommorowConditionImg.src = weather.tommorow.condition.icon;
      tommorowConditionText.textContent = weather.tommorow.condition.text;

      // =======================
      // the day after tommorow
      // =======================

      afterTommorowDay.textContent = weather.dayAfterTommorow.day;
      afterTommorowMaxTemp.textContent = weather.dayAfterTommorow.maxTemp;
      afterTommorowMinTemp.textContent = weather.dayAfterTommorow.minTemp;
      afterTommorowConditionImg.src = weather.dayAfterTommorow.condition.icon;
      afterTommorowConditionText.textContent =
        weather.dayAfterTommorow.condition.text;
    })
    .catch((error) => {
      console.error(error);
    });
}
