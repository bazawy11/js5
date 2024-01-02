const locationSearch = document.querySelector("#location-search");
const searchTable = document.querySelector("#result-table");
const table = document.querySelector("#table");

async function getLocations(text) {
  fetch(
    `http://api.weatherapi.com/v1/search.json?key=d0fda70a3b8249b194a72202240101&q=${text}`
  )
    .then((response) => response.json())
    .then((data) => {
      // Do something with the fetched data
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
        btn.innerHTML = `Choose ${id}`;
        //   btn.setAttribute("onclick", console.log(id));
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
      let weather = {
        current: {
          location: data.location.name,
          temp: data.current.temp_c,
          condition: data.current.condition,
          wind: data.current.wind_kph,
          windDir: data.current.wind_dir,
          date: data.forecast.forecastday[0].date,
          rain: data.forecast.forecastday[0].day.daily_chance_of_rain,
        },
        tommorow: {
          date: data.forecast.forecastday[1].date,
          maxTemp: data.forecast.forecastday[1].day.maxtemp_c,
          minTemp: data.forecast.forecastday[1].day.mintemp_c,
          condition: data.forecast.forecastday[1].day.condition,
        },
        dayAfterTommorow: {
          date: data.forecast.forecastday[2].date,
          maxTemp: data.forecast.forecastday[2].day.maxtemp_c,
          minTemp: data.forecast.forecastday[2].day.mintemp_c,
          condition: data.forecast.forecastday[2].day.condition,
        },
      };
      // Do something with the fetched data\

      console.log(weather);
      // console.log(data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error(error);
    });
}
// current.rain.day.daily_chance_of_rain;
