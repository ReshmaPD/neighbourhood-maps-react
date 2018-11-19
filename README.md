# Neighbourhood Maps React Project

## Table of Contents
* [About the Application](#about-the-application)
* [Application dependencies](#application-dependencies)
* [Getting Started](#getting-started)
* [How to Run the Application](#how-to-run-the-application)
* [Production mode](#production-mode)
* [Utilites and Assests](#utilites-and-assests)
* [Resources](#resources)
* [Built with](#Built-with)
* [Technologies](#technologies)
* [Contributing](#contributing)

## About the Application

A **Neighbourhood Maps React Project** which is a web application with mobile and offline first aproach that is responsive and works offline.Conforming with the web accesibilty standard this single page application shows a map with markers representing some points of interest in **City**. The app interface is such that the user can click on a marker on the map or on a list item in the toggleable side menu to display an info window with details of that place.User can also search specific places with a search input provided on the sidebar.

## Application-dependencies

            This application Requires Active Internet Connection to Run

* This app uses [react-google-map](https://www.npmjs.com/package/react-google-maps) to help integrate google maps with react more smoothly. As well as add extra functionalites such as as marker and info window.


##  Getting Started
* To run the project you will need **Node.js** installed on your machine, which comes with **npm** , a node package manager.
* Visit the official page to download it and read more about it [Node.js](https://nodejs.org/it/)


## How to Run the Application

 1. Download the zip folder and unzip it.
 2. _Open_ the main folder
 3. Do the of following **two** steps to get this app running
    i. In this folder open the **terminal** , cd to current folder and type `npm install` to install dependencies.
    ii.Then, type `npm start` into terminal after the installation is complete.
 4. A new window will be opened visting `http://localhost:3000` in your default browser.
 5. With your server running, You can also visit the site: `http://localhost:3000` in your preferred browser.
 6. To disconnect simply close your terminal.


### Production mode

* To create a production mode use `npm run build`
* For more info Refer [create react app documentation](https://github.com/facebook/create-react-app#npm-run-build-or-yarn-build)
 **The build is minified and the filenames include the hashes.By default, it also includes a service worker so that your app loads from local cache on future visits.**


### Utilites and Assests

#### Google Maps Api
The project makes use of the [Google maps api](https://developers.google.com/maps/documentation/javascript/tutorial) service to display the map of the chosen neighbourhood.

#### Fouresquare Api
The data retrieved for each place though, are supplied by [FoursquareAPI](https://developer.foursquare.com/) a local search and recommender-system service. Attribution are credited on the left side menu and on each infowindow displayed when the user click on a marker.
In the PlacesDataAPI file in src folder you can find the methods **getPlaces** and **getDetails** which are responsible for the request to the foursquareAPI.


## Resources


* [Create React App](https://github.com/facebook/create-react-app)
* [BrowserRouter](https://reacttraining.com/react-router/web/api)
* [Building with React](https://udacity.com/)
* [React](https://reactjs.org/docs/thinking-in-react.html)
* [React](https://stackoverflow.com/questions/28868071/onchange-event-using-react-js-for-drop-down)
* [React](https://codeburst.io/use-class-properties-to-clean-up-your-classes-and-react-components-93185879f688)
* [React](https://reactjs.org/docs/faq-functions.html)
* [React](https://reactjs.org/tutorial/tutorial.html#reactive-state)




* [Neighbourhood project walkthrough](https://www.youtube.com/watch?v=Uw5Ij56RhME&t=10296s) gives me some useful ideas to get started
* [How to render google maps with react](https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/) gives me a good understanding of how to implement the map with react, since it makes use of virtual dom and the load of the main script to google api service is disrupted
* [react google maps docs](https://tomchentw.github.io/react-google-maps/#introduction) helps me understand how to get started with this package



#### Built with

This project was bootstraped with [create react app](https://github.com/facebook/create-react-app)


## Technologies

* Visual Studio Code Editor
* React.js
* Javascript
* HTML
* CSS


## Contributing
Any suggestions are welcome.


