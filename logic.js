async function main() {
  // Create our initial map object
  // Set the longitude, latitude, and the starting zoom level
  var myMap = L.map("map").setView([39.8283, -98.5795], 4.5);

  // Add a tile layer (the background map image) to our map
  // Use the addTo method to add objects to our map
  L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 19,
      id: "mapbox.streets",
      accessToken: API_KEY
    }
  ).addTo(myMap);

  composeStateData().then(stateData => {
    console.log("stateData", stateData);

    let radius_multiplier = 10;

    stateData.forEach(state => {
      L.circle([state.latitude, state.longitude], {
        color: "black",
        fillColor: "gray",
        fillOpacity: 0.3,
        radius: radius_multiplier * state.cases
      }).addTo(myMap);

      L.circle([state.latitude, state.longitude], {
        color: "red",
        fillColor: "red",
        fillOpacity: 0.75,
        radius: radius_multiplier * state.deaths
      }).addTo(myMap);
    });
  });
}

// need proxyURL because the API doesn't send back the right cors header

async function getMostRecentCoronaData(state) {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiURL = "http://coronavirusapi.com/getTimeSeries/";

  returnVal = fetch(
    proxyUrl + apiURL + state,
    {
      method: "GET" // *GET, POST, PUT, DELETE, etc.
    } // no-cors, *cors, same-origin
  )
    .then(response => {
      return response.text();
    })
    .then(body => {
      body = body.split("\n");
      body.forEach((row, index) => {
        body[index] = row.split(",");
      });
      return body[body.length - 1];
    })
    .then(mostRecentCoronaData => {
      return mostRecentCoronaData;
    })
    .catch(err => {
      console.log("Api Request failed with error", err);
    });

  return returnVal;
}

// awaits the whole foreach to run before returning
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function composeStateData() {
  var stateData = [
    {
      state: "Alabama",
      latitude: 32.799,
      longitude: -86.8073
    },
    {
      state: "Alaska",
      latitude: 61.385,
      longitude: -152.2683
    },
    {
      state: "Arizona",
      latitude: 33.7712,
      longitude: -111.3877
    },
    {
      state: "Arkansas",
      latitude: 34.9513,
      longitude: -92.3809
    },
    {
      state: "California",
      latitude: 36.17,
      longitude: -119.7462
    },
    {
      state: "Colorado",
      latitude: 39.0646,
      longitude: -105.3272
    },
    {
      state: "Connecticut",
      latitude: 41.5834,
      longitude: -72.7622
    },
    {
      state: "Delaware",
      latitude: 39.3498,
      longitude: -75.5148
    },
    {
      state: "Florida",
      latitude: 27.8333,
      longitude: -81.717
    },
    {
      state: "Georgia",
      latitude: 32.9866,
      longitude: -83.6487
    },
    {
      state: "Hawaii",
      latitude: 21.1098,
      longitude: -157.5311
    },
    {
      state: "Idaho",
      latitude: 44.2394,
      longitude: -114.5103
    },
    {
      state: "Illinois",
      latitude: 40.3363,
      longitude: -89.0022
    },
    {
      state: "Indiana",
      latitude: 39.8647,
      longitude: -86.2604
    },
    {
      state: "Iowa",
      latitude: 42.0046,
      longitude: -93.214
    },
    {
      state: "Kansas",
      latitude: 38.5111,
      longitude: -96.8005
    },
    {
      state: "Kentucky",
      latitude: 37.669,
      longitude: -84.6514
    },
    {
      state: "Louisiana",
      latitude: 31.1801,
      longitude: -91.8749
    },
    {
      state: "Maine",
      latitude: 44.6074,
      longitude: -69.3977
    },
    {
      state: "Maryland",
      latitude: 39.0724,
      longitude: -76.7902
    },
    {
      state: "Massachusetts",
      latitude: 42.2373,
      longitude: -71.5314
    },
    {
      state: "Michigan",
      latitude: 43.3504,
      longitude: -84.5603
    },
    {
      state: "Minnesota",
      latitude: 45.7326,
      longitude: -93.9196
    },
    {
      state: "Mississippi",
      latitude: 32.7673,
      longitude: -89.6812
    },
    {
      state: "Missouri",
      latitude: 38.4623,
      longitude: -92.302
    },
    {
      state: "Montana",
      latitude: 46.9048,
      longitude: -110.3261
    },
    {
      state: "Nebraska",
      latitude: 41.1289,
      longitude: -98.2883
    },
    {
      state: "Nevada",
      latitude: 38.4199,
      longitude: -117.1219
    },
    {
      state: "New Hampshire",
      latitude: 43.4108,
      longitude: -71.5653
    },
    {
      state: "New Jersey",
      latitude: 40.314,
      longitude: -74.5089
    },
    {
      state: "New Mexico",
      latitude: 34.8375,
      longitude: -106.2371
    },
    {
      state: "New York",
      latitude: 42.1497,
      longitude: -74.9384
    },
    {
      state: "North Carolina",
      latitude: 35.6411,
      longitude: -79.8431
    },
    {
      state: "North Dakota",
      latitude: 47.5362,
      longitude: -99.793
    },
    {
      state: "Ohio",
      latitude: 40.3736,
      longitude: -82.7755
    },
    {
      state: "Oklahoma",
      latitude: 35.5376,
      longitude: -96.9247
    },
    {
      state: "Oregon",
      latitude: 44.5672,
      longitude: -122.1269
    },
    {
      state: "Pennsylvania",
      latitude: 40.5773,
      longitude: -77.264
    },
    {
      state: "Rhode Island",
      latitude: 41.6772,
      longitude: -71.5101
    },
    {
      state: "South Carolina",
      latitude: 33.8191,
      longitude: -80.9066
    },
    {
      state: "South Dakota",
      latitude: 44.2853,
      longitude: -99.4632
    },
    {
      state: "Tennessee",
      latitude: 35.7449,
      longitude: -86.7489
    },
    {
      state: "Texas",
      latitude: 31.106,
      longitude: -97.6475
    },
    {
      state: "Utah",
      latitude: 40.1135,
      longitude: -111.8535
    },
    {
      state: "Virginia",
      latitude: 37.768,
      longitude: -78.2057
    },
    {
      state: "Vermont",
      latitude: 44.0407,
      longitude: -72.7093
    },
    {
      state: "Washington",
      latitude: 47.3917,
      longitude: -121.5708
    },
    {
      state: "West Virginia",
      latitude: 38.468,
      longitude: -80.9696
    },
    {
      state: "Wisconsin",
      latitude: 44.2563,
      longitude: -89.6385
    },
    {
      state: "Wyoming",
      latitude: 42.7475,
      longitude: -107.2085
    }
  ];

  var stateAbbrs = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY"
  ];

  //Put all objects together
  stateData.forEach((state, index) => {
    state.abbr = stateAbbrs[index];
  });

  await asyncForEach(stateData, async state => {
    let stateData = await getMostRecentCoronaData(state.abbr);
    state.cases = +stateData[2];
    state.deaths = +stateData[3];
  });

  console.log(stateData);
  return stateData;
}

main();
