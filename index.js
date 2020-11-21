let APIUrl = "https://api.covid19api.com/summary"

async function fetchGlobalData(){
   const response = await fetch(APIUrl)
   let data = await response.json()
   let global = data.Global;

         buildTableGlobal();
   
         function buildTableGlobal() {
           let table = document.getElementById("global-table");
           let row = `<tr>
                           
                           <td>${global.NewDeaths}</td>
                           <td>${global.NewRecovered}</td>
                           <td>${global.NewDeaths}</td>
                           <td>${global.TotalConfirmed}</td>
                           <td>${global.TotalRecovered}</td>
                           <td>${global.TotalDeaths}</td>
                     </tr>`;
           table.innerHTML += row;

 }
}

fetchGlobalData()

async function southAfricaSummary() {
   let response = await fetch(APIUrl)
    let data = await response.json()

      let SouthAfrica = data.Countries[158];
      let date = SouthAfrica.Date;
      let d = new Date(date);
      let newDate = d.toLocaleString("en-AU");

      buildTableSouthAfrica();
      function buildTableSouthAfrica() {
        let table = document.getElementById("southa-africa");
        let row = `<tr> 
                          <td>${newDate}</td>
                          <td>${SouthAfrica.NewConfirmed}</td>
                          <td>${SouthAfrica.NewDeaths}</td>
                          <td>${SouthAfrica.NewRecovered}</td>
                         
                    </tr>`;
        table.innerHTML += row;
      }
    
}
southAfricaSummary();



async function fechSouthAfrica() {
  let response = await fetch("https://api.covid19api.com/country/south-africa?from=2020-03-01T00:00:00Z&to=2020-11-01T00:00:00Z")
  let data = await response.json(); 
  
      let totalconfimed = [],
        Totalrecovered = [],
        TotalDeath = [];

      for (let i = 0; i < data.length; i++) {
        totalconfimed.push(data[i].Confirmed);
        Totalrecovered.push(data[i].Recovered);
        TotalDeath.push(data[i].Deaths);
      }

      let confirmed = totalconfimed.reduce( (accumulator, currentValue)=> accumulator + currentValue , 0);
      let recovered = Totalrecovered.reduce((accumulator, currentValue)=> accumulator + currentValue  , 0);
      let Deaths = TotalDeath.reduce((accumulator, currentValue)=>  accumulator + currentValue  , 0);
       
      confirmed = Math.floor(confirmed /9);
      recovered = Math.floor(recovered / 9);
      Deaths = Math.floor(Deaths / 9);

      buildPredictionTable();
      function buildPredictionTable() {
        let table = document.getElementById("prediction");
        let row = `<tr> 
                         
                          <td>${confirmed}</td>
                          <td>${recovered}</td>
                          <td>${Deaths}</td>
                         
                    </tr>`;
        table.innerHTML += row;
      }
      
      let predictionData = document.getElementById("predictionData");
      let btnPredict = document.getElementById("pred");
      
      btnPredict.addEventListener("click", showPred);
      function showPred() {
        predictionData.style.visibility = "visible";
      }
    // EXTRACT VALUE FOR HTML HEADER.
      var col = [];
      for (let i = 0; i < data.length; i++) {
        for (let key in data[i]) {
          if (`${data[i][key]}` !== "") {
            if (col.indexOf(key) === -1) {
              col.push(key);
            }
          }
        }
      }
      // CREATE DYNAMIC TABLE.
      let table = document.createElement("table");

      let tr = table.insertRow(-1);

      for (let i = 0; i < col.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
      }

     // ADD JSON DATA TO THE TABLE AS ROWS
      for (let i = 0; i < data.length; i++) {
        tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
          let tabCell = tr.insertCell(-1);
          tabCell.innerHTML = data[i][col[j]];
        }
      }
      let divContainer = document.getElementById("showData");
      divContainer.innerHTML = "";
      divContainer.appendChild(table);
    
    
}
fechSouthAfrica();
