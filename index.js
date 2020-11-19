function fechGlobal() {
  fetch("https://api.covid19api.com/summary")
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR: data could not be retrieved");
      }
      return response.json();
    })
    .then((data) => {
      let global = data.Global;
      buildTableGlobal();

      function buildTableGlobal() {
        var table = document.getElementById("global-table");
        var row = `<tr>
                        
                        <td>${global.NewDeaths}</td>
                        <td>${global.NewRecovered}</td>
                        <td>${global.NewDeaths}</td>
                        <td>${global.TotalConfirmed}</td>
                        <td>${global.TotalRecovered}</td>
                        <td>${global.TotalDeaths}</td>
                  </tr>`;
        table.innerHTML += row;
      }
    });
}
fechGlobal();



function southAfricaSummary() {
  fetch("https://api.covid19api.com/summary")
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR: data could not be retrieved");
      }
      return response.json();
    })
    .then((data) => {
      let SouthAfrica = data.Countries[158];
      let date = SouthAfrica.Date;
      let d = new Date(date);
      let newDate = d.toLocaleString("en-AU");

      buildTableSouthAfrica();
      function buildTableSouthAfrica() {
        var table = document.getElementById("southa-africa");
        var row = `<tr> 
                          <td>${newDate}</td>
                          <td>${SouthAfrica.NewConfirmed}</td>
                          <td>${SouthAfrica.NewDeaths}</td>
                          <td>${SouthAfrica.NewRecovered}</td>
                         
                    </tr>`;
        table.innerHTML += row;
      }
    });
}
southAfricaSummary();



function fechSouthAfrica() {
  fetch(
    "https://api.covid19api.com/country/south-africa?from=2020-03-01T00:00:00Z&to=2020-11-01T00:00:00Z"
  )
    .then((response) => {
      if (!response.ok) {
        throw Error("Error");
      }
      return response.json();
    })
    .then((data) => {
      let totalconfimed = [],
        Totalrecovered = [],
        TotalDeath = [];
      for (let i = 0; i < data.length; i++) {
        totalconfimed.push(data[i].Confirmed);
        Totalrecovered.push(data[i].Recovered);
        TotalDeath.push(data[i].Deaths);
      }
      let confirmed = totalconfimed.reduce(function (first, second) {
        return first + second;
      }, 0);
      let recovered = Totalrecovered.reduce(function (first, second) {
        return first + second;
      }, 0);
      let Deaths = TotalDeath.reduce(function (first, second) {
        return first + second;
      }, 0);
      confirmed = Math.floor(confirmed / 9);
      recovered = Math.floor(recovered / 9);
      Deaths = Math.floor(Deaths / 9);

      buildPrediction();
      function buildPrediction() {
        var table = document.getElementById("prediction");
        var row = `<tr> 
                         
                          <td>${confirmed}</td>
                          <td>${recovered}</td>
                          <td>${Deaths}</td>
                         
                    </tr>`;
        table.innerHTML += row;
      }

      var mtT = document.getElementById("predictionData");
      var btn = document.getElementById("pred");
      btn.addEventListener("click", showPred);
      function showPred() {
        mtT.style.visibility = "visible";
      }

      var col = [];
      for (var i = 0; i < data.length; i++) {
        for (var key in data[i]) {
          if (`${data[i][key]}` !== "") {
            if (col.indexOf(key) === -1) {
              col.push(key);
            }
          }
        }
      }
      var table = document.createElement("table");

      var tr = table.insertRow(-1);

      for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
      }

      for (var i = 0; i < data.length; i++) {
        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
          var tabCell = tr.insertCell(-1);
          tabCell.innerHTML = data[i][col[j]];
        }
      }
      var divContainer = document.getElementById("showData");
      divContainer.innerHTML = "";
      divContainer.appendChild(table);
    })
    .catch((error) => {
      console.log(error);
    });
}
fechSouthAfrica();
