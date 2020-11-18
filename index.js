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
      console.log(global);
      buildTableGlobal();

      function buildTableGlobal() {
        var table = document.getElementById("global-table");
        var row = `<tr>
                        
                        <td>${global.NewDeaths}</td>
                        <td>${global.NewRecovered}</td>
                        <td>${global.NewDeaths}</td>
                        <td>${global.TotalConfirmed}</td>
                        <td>${global.TotalRecovered}</td>
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
      let newDate = d.toLocaleString("en-AU")
      
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
    "https://api.covid19api.com/country/south-africa?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z"
  )
    .then((response) => {
      if (!response.ok) {
        throw Error("Error");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

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
