# Airware Full-stack app

The goal was to develop a Fullstack serverless application to display GeoJSON data inside leaflet map.

### Requirements to develop this application on my computer (Windows):
- NodeJS v8.11.4 & nmp v5.6
- Have an AWS account to use the various services
- A geographical data set with coordinates (latitude and longitude) in WGS84 format. [Here, we use the localization of Paris schools](https://www.data.gouv.fr/fr/datasets/etablissements-scolaires-2/) 

### Achievements :
#### Backend (folder "api"):
- Install and set up AWS CLI to manage easily the AWS services from command line interface.To do this, we need Acess key ID ans Secret access key from AWS account User.
- Set up AWS S3 service to store and access to the JSON file of the geographical data. i created a bucket name "geo-data-json" with the right permissions to access with our application.
- Install and set up the serverless Framework to work with AWS Lambda & AWS API Gateway services
- Create an API project using [nodeJS starter](https://github.com/AnomalyInnovations/serverless-nodejs-starter).
This starter pack have this avantages for me:  
 1- Use a similar version of JavaScript in the frontend and backend.  
 2- Allow you to run API Gateway, Lambda locally with the plugin serverless-offline.  
 3- And add support for unit tests. Unfortunately, I didn't have enough time to use it.  
- Install all the dependencies of the nodejs starter project
- Install a specific packages "aws-sdk" to talk to the various AWS services
- Write the various backend APIs with nodeJS. For the needed, just one function call getDataGeoJson, who return all the geographical data formatted in GeoJSON.
###### Instructions for deployment :
The api backend has already deploy by me in AWS services, [here is the endpoints url](https://awtpiluamk.execute-api.eu-west-3.amazonaws.com/dev/airwaretest)
To deploy the local project in our AWS services, i just need to launch this command line
``` bash
$ serverless deploy
```
This will automatically create our endpoint API url and Lambda function.

#### Frontend (folder "client"):
- Set up the front project with Create React App. We'll use the [Create React App](https://github.com/facebook/create-react-app/blob/next/README.md#create-react-app-) project to be faster to deploy the project.
i choose this project because comes pre-loaded with a pretty convenient yet minimal development environment. It includes live reloading, a testing framework, ES6 support, and much more. It just for a question of time :)
- Install the package AWS amplify to allow our React app to talk to the AWS resources that we created in folder api (backend)
- Inside src/App.js i create the code which will allow me to connect to the previously created API and retrieve the GeoJSON. This object is used in a leaflet map using react-leaflet component
###### Instructions for deployment :
To deploy easily the frontend, i used Netlify and a github repository of the [client app](https://github.com/alexfroger/airwareclientapp). The url is [https://airwaretest.netlify.com/](https://airwaretest.netlify.com/)

#### Todo/ideas of enhancements:
- An other way to deploy our frontend application is to use AWS S3 to make it available via a domain name using AWS Route 53 and secure the application in https with Aws Certificate Manage
- Use Aws cognito to manage user, add a login page to secure the application
- More advanced management of input sources from simple text or connected to file management API(s) like google drive, amazon, dropbox.
- Be able to manage other formats other than JSON in input (XML, CSV, GeoJSON directly)
- Set up filters with html selectors to display data only by type and/or year.
- Integrate Bootstrap to make the application look more friendly with the package [React-Bootstrap](https://react-bootstrap.github.io/)
- Implementation of unit test with Jest to test the proper functioning of the code and improve the quality of the code.
- Set up SSL to serve our app over HTTPS

I really like to learn to use AWS. it seems to be awesome :)
