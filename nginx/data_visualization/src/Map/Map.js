// export default OwnMap
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


// icon creation
import L from 'leaflet'
import requests from '../helpers/requests'
<<<<<<< HEAD
import { Button, colors, Grid, Tab, Box, Skeleton, bottomNavigationActionClasses } from '@mui/material';

import { Chart as ChartJS, ArcElement, Tooltip, Legend, } from 'chart.js';
import ApexChart from './PieChart'
=======
import { Button } from '@mui/material';
import language from '../languages/languages';
>>>>>>> 45f4137d0cbe67aeb4d569c144ac8e98d9282afd





import { useNavigate, Link } from 'react-router-dom';
export let map;


class OwnMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: []
    };
  };

  componentDidMount() {
    map = this.refs.map;
    this.getStations()
  };


  getStations() {
    let self = this;
    let stations = [];
    requests.getStations()
      .then((res) => {

        stations = res.data;
        console.log(stations)
        this.setState({
          stations: stations
        })

      })
      .catch((res) => console.log(res))
  }

  render() {
    const bounds = [[
      48.87194147722911,
      5.943603515625

<<<<<<< HEAD
    ],
    [52.415822612378776,
      9.810791015625,
=======
    render() {
        const bounds = [[
            48.87194147722911,
            5.943603515625

          ],
          [52.415822612378776,
            9.810791015625,
            
          ]]
        return (
            <MapContainer style={{ height: "90vh" }} bounds={bounds} zoom={15} ref="map" >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Map markers on the Map,if marker was clicked turn green */}
                {this.state.stations.map((marker, i) => {
                    return <Marker  key={"marker" + i}
                        position={[marker.location.lat, marker.location.lng ? marker.location.lng : marker.location.lon]}>                 
                        <Popup minWidth={90}>
                        <span >
                          {language[this.props.language]["map"]["stationName"]}{marker.name}
                        </span>
                        <br/>
                        <Button component={Link} to={"/view/station/"+ marker.station_id}>{language[this.props.language]["map"]["inspect"]}</Button>
                      </Popup> </Marker>
                })}
>>>>>>> 45f4137d0cbe67aeb4d569c144ac8e98d9282afd

    ]]
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item lg={8}>
            <MapContainer style={{ height: "90vh", width: "130vh" }} bounds={bounds} zoom={15} ref="map" >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* Map markers on the Map,if marker was clicked turn green*/}
              {this.state.stations.map((marker, i) => {
                return <Marker key={"marker" + i}
                  position={[marker.location.lat, marker.location.lng ? marker.location.lng : marker.location.lon]}>
                  <Popup minWidth={90}>
                    <span >
                      Name der Station: {marker.name}
                    </span>
                    <br />
                    <Button component={Link} to={"/view/station/" + marker.station_id}>Beobachte Station</Button>
                  </Popup> </Marker>
              })}
            </MapContainer>
          </Grid>
          <Grid item lg={4}>
            <h1 style={{ textAlign: "left", color: "darkorange", fontFamily: "Helvetica" }}> Top 10 Vogelarten, die an den Stationen erkannt wurden</h1>
            
      
            <ApexChart/>
          </Grid>

        </Grid>
      </div>

    );

  }

}


export default OwnMap



