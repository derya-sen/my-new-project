import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { borderColor } from "@mui/system";
import { colors, experimentalStyled } from "@mui/material";

/* In dieser Klasse wird das Diagramm mit seinen Eigenschaften definiert
(Typ, Farben, Winkel, Höhe, Größe usw.) */

class ApexChart extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      heute: "2022.07.28",
      gestern: "2022.07.27",
      series: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      options: {
        colors: ["#F9CE1D", "#FF9800", "#F46036", "#EA3546", "#eb34b4", "#A300D6", "#775DD0", "#008FFB", "#43BCCD", "#13D8AA", "#4CAF50" ],
        plotOptions: {
          pie: {
            startAngle: 0,
            endAngle: 360,
            expandOnClick: true,
            offsetX: 10,
            offsetY: 10,
            customScale: 1,
            dataLabels: {
              offset: 0,
              minAngleToShowLabel: 15
            }
          }
          },
         
          chart: {
            type: 'pie'
          },

          stroke: {
            colors: ["#F9CE1D", "#FF9800", "#F46036", "#EA3546", "#eb34b4", "#A300D6", "#775DD0", "#008FFB", "#43BCCD", "#13D8AA", "#4CAF50" ],
          },

          labels: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

          legend: {
            show: true,
            showForSingleSeries: false,
            showForNullSeries: true,
            showForZeroSeries: true,
            position: 'right',
            horizontalAlign: 'left',
            floating: false,
            fontSize: '13px',
            fontFamily: 'Helvetica',
            fontWeight: 100,
            formatter: undefined,
            inverseOrder: false,
            width: 200,
            height: 500,
            tooltipHoverFormatter: undefined,
            customLegendItems: [],
            offsetX: 10,
            offsetY: 10,
          
            markers: {
              width: 12,
              height: 12,
              radius: 12 
            },
          }

        },
      };
    }


    /*Zugriff auf API mit fetch. Daten für den aktuellen Tag werden abgefragt
    Gegebenfalls müsste sowohl hier als auch an der nächsten Funktion der Fall für 
    einen Fehler abgefangen werden */

    getText = async (file) => {
      let myObject = await fetch(file)
      let myText = await myObject.text();
      var beobachtung = JSON.parse(myText)
      console.log(beobachtung)
      var heute = beobachtung[this.state.heute]
      console.log(heute)
      if ( heute === '{}'){
        console.log("keine Daten für heute vorhanden")
      } else{
      this.createData(heute)
      }
  }

  //Erneuter Zugriff auf API um Daten für den vorherigen Tag abzufragen

    getText2 = async (file) => {
      let myObject = await fetch(file);
      let myText = await myObject.text();
      var beobachtung = JSON.parse(myText)
      console.log(beobachtung)
      var gestern = beobachtung[this.state.gestern]
      console.log(gestern)
      if ( gestern === '{}') {
        console.log("keine Daten für gestern vorhanden")
      } else{
      this.createData(gestern)
    }
  }
  
     
    /* Name und Anzahl in einem Array speichern, der Größe nach sortieren und 
    Top 10 Vögel mit der größten Anzahl herausfiltern */

    createData = (feature) => {
      let birds = [];
      for (var i = 0; i < feature.length; i++) {
        birds.push({ name: feature[i].latinName, amount: feature[i].amount, germanName: feature[i].germanName })
      }
      let sorted = birds.sort((a, b) => b.amount - a.amount)
      let topTen = sorted.slice(0, 10);
      this.prepareChart(topTen, sorted);
    }
    


    /* Anzahl der Vögel in einem Array speichern, Anzahl der Vögel außerhalb der Top 10 addieren
    um diese als sonstige zusammenfassen zu können */

    prepareChart = (feature, feature1) => {
      let amount = [];
      for (var i = 0; i < feature.length; i++) {
        amount.push(feature[i].amount);
      }

      let sonstige = [];
      for (var i = 10; i < feature1.length; i++) {
        sonstige.push({ name: feature1[i].latinName, amount: feature1[i].amount, germanName: feature1[i].germanName })

      }
      let sonstigeAmount = 0;
      for (var i = 0; i < sonstige.length; i++) {
        sonstigeAmount = sonstigeAmount + sonstige[i].amount;
      }
      amount.push(sonstigeAmount)

      /* Abfrage nach dem deutschen und lateinischen Namen.
      Wenn kein deutscher Name vorhanden, wird der lateinische verwendet*/

      let label = [];
      for (var i = 0; i < feature.length; i++) {
        if (feature[i].germanName == "") {
          label.push(feature[i].name)
        }
        else {
          label.push(feature[i].germanName)
        }
      }
      label.push('sonstige');
      console.log(label)
      this.setState({
        series: amount, options: {
          ...this.state.options,
          labels: label
        }
      })
    
    }

    // Aktivität der Buttons verändern
    handleAlignment = (event, newAlignment) => {
      this.setState({ alignment: newAlignment });
    };
  

    componentDidMount() {

      // Datum von heute abfragen

      let date = new Date();
      let today = String(date.getFullYear()) + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
      console.log(today);

      // Datum von gestern abfragen 
      let date2 = new Date(date.setDate(date.getDate() - date.getDay() - 1));
      let yesterday = String(date2.getFullYear()) + '-' + String(date2.getMonth() + 1).padStart(2, '0') + '-' + String(date2.getDate()).padStart(2, '0');
      console.log(yesterday);

      this.setState({ heute: today, gestern: yesterday }, () =>
        this.getText("https://www.wiediversistmeingarten.org/api/count"))
      
    }


    render() {
      return (
        <div>
          
          <div id="chartPie">
            <Chart options={this.state.options} series={this.state.series} type="pie" width={600} height={1000} />
          </div>

          <br/>
          <br/>

          <div style={{ display: "flex", justifyContent: "flex-start"}}>
          <ToggleButtonGroup
            
            value={this.state.alignment}
            exclusive
            onChange={this.handleAlignment}
            aria-label="text alignment"
            
          >
            <ToggleButton className="heute" value="heute" aria-label="heute" onClick={() => this.getText("https://www.wiediversistmeingarten.org/api/count")} active> heute </ToggleButton>
            <ToggleButton className="gestern" value="gestern" aria-label="gestern"  onClick={() => this.getText2("https://www.wiediversistmeingarten.org/api/count")}> gestern</ToggleButton>
          </ToggleButtonGroup>
        </div>
        
        </div>
        
        );

    }
  }


export default ApexChart;