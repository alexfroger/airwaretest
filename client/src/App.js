import React, { Component } from 'react';
import Amplify, { API } from 'aws-amplify'; //To allow our React app to talk to the AWS resources that we created in folder api (backend)
import config from "./config"; //Configuration file for our app that will reference all the ressources we have created in AWS.
import { Map, TileLayer, GeoJSON } from 'react-leaflet' //Import React-Leaflet, who provides an abstraction of Leaflet as React components.

//Initialize AWS Amplify toset the various AWS ressource that we want to interact with.
Amplify.configure({
  API: {
    endpoints: [
      {
        name: "airwaretest", //Name of our API
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

class App extends Component {
   constructor() {
		super();
		
		//Default state to initialize leaflet map. Default center to Paris with zoom to 14
		this.state = {
		  lat: 48.866667,
		  lng: 2.333333,
		  zoom: 14,
		  isLoading: true
		};	
  }
  //Connect to the api backend to get the GeoJSON Object.
  getGeoJson() {
	return API.get('airwaretest', '/').then(geojsonFeaturesCollection => {
		return geojsonFeaturesCollection;
	});
  }
  //Get asynchronously the GeoJSON Object, immediately after a component is mounted
  async componentDidMount() {
	this.json = await this.getGeoJson();
	this.setState({isLoading: false});
  }
  //Template for rendering a loader
  renderLoading() {
    return (
        <h4>Loading...</h4>
    );
  }
  //Template for rendering the GeoJSON data inside a leaflet map using react-leaflet component
  renderGeoJSON() {
	const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom} >
		<TileLayer
		  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
		/>
		<GeoJSON key={Math.random()} data={this.json}/>
	  </Map>
    );
  }
  //Required method to render React elements 
  render() {	
		return (
			<div>
				<div class="title">TEST FOR AIRWARE</div>
				<div class="information">
					<div>Here is a test of a full-stack application using nodeJS and ReactJS. These Javascript technologies communicate thanks to AWS Lambda services via an AWS API gateway.</div>
					<div>The data source is a json file hosted on the AWS S3 service. We display on the map all schools from kindergarten to college for the year 2017/2018 and 2018/2019</div>
				</div>
				{this.state.isLoading ? this.renderLoading() : this.renderGeoJSON()}
			</div>
		);
  }
}

export default App;
