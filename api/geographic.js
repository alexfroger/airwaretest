//Package use to talk to the various AWS services
import AWS from "aws-sdk";

/*
* Lambda function getDataGeoJSON()
* Return an object GeoJSON from a json file hosted on AWS S3, if not exist return false
*/
export const getDataGeoJSON = async (event, context) => {
	//Call AWS S3 Service
	var s3 = new AWS.S3({apiVersion: '2006-03-01'});
	var params = {Bucket: 'geo-data-json', Key: 'etablissements-scolaires.json'};
	
	//Get our JSON data file inside javascript object.
	const s3getObjectPromise = s3.getObject(params).promise();
	// Set response headers to enable CORS (Cross-Origin Resource Sharing)
	const headers = {
	  "Access-Control-Allow-Origin": "*",
	  "Access-Control-Allow-Credentials": true
	};
	//Parse the json data object into a GeoJSON Object which will be interpreted by leaflet
	return await s3getObjectPromise.then((response) => {
		//If the json data exist return GeoJSON else False
		if (response !== undefined && response.Body !== undefined) {
			var objectSchool = JSON.parse(response.Body.toString());
			var arrayFeatures = [];
			
			//We loop on the list of schools to format each position in GeoJSON (The coordinate are in WGS84 format)
			Object.keys(objectSchool).map(function(objectKey, index) {
				var value = objectSchool[objectKey];
				arrayFeatures.push({
					"type": "Feature",
					"geometry": value.geometry
				});
			});
			
			//GeoJSON here should be a type FeatureCollection
			var geojsonFeatureCollection = {
			   "type": "FeatureCollection",
			   "features": arrayFeatures
			};
			
			//Return the GeoJSON object
			return {
				statusCode: 200,
				headers: headers,
				body: JSON.stringify(geojsonFeatureCollection),
			};
		} else {
			//Return False if data not exist
		  return {
			statusCode: 500,
				headers: headers,
				body: JSON.stringify({ status: false })
		  };
		}
  });
};