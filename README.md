# Neighbourhood Maps React Project

## Table of Contents

- [About the Application](#about-the-application)
- [Application dependencies](#application-dependencies)
- [Getting Started](#getting-started)
- [How to Run the Application](#how-to-run-the-application)
- [Production mode](#production-mode)
- [Utilites and Assests](#utilites-and-assests)
- [Resources](#resources)
- [Built with](#Built-with)
- [Technologies](#technologies)
- [Contributing](#contributing)

## About the Application

A **Neighbourhood Maps React Project** which is a web application with mobile and offline first aproach that is responsive and works offline.Conforming with the web accesibilty standard this single page application shows a map with markers representing some points of interest in **Mumbai City**. The app interface is such that the user can click on a marker on the map or on a list item in the toggleable side menu to display an info window with details of that place.User can also search specific places with a search input provided on the sidebar.

## Application-dependencies

            This application Requires Active Internet Connection to Run

## Getting Started

- To run the project you will need **Node.js** installed on your machine, which comes with **npm** , a node package manager.
- Visit the official page to download it and read more about it [Node.js](https://nodejs.org/it/)

## How to Run the Application

1.  Download the zip folder and unzip it.
2.  _Open_ the main folder
3.  Do the of following **two** steps to get this app running  
    i. In this folder open the **terminal** , cd to current folder and type `npm install` to install dependencies.    
    ii.Then, type `npm start` into the terminal after the installation is complete.  
4.  A new window will be opened visting `http://localhost:3000` in your default browser.
5.  With your server running, You can also visit the site: `http://localhost:3000` in your preferred browser.
6.  To disconnect simply close your terminal.

## Production mode

- To create a production mode use `npm run build` or `yarn build`
- This will build the app for production to the `build` folder.
- It correctly bundles React in production mode and optimizes the build for the best performance.
- For more info Refer [create react app documentation](https://github.com/facebook/create-react-app#npm-run-build-or-yarn-build)
  **The build is minified and the filenames include the hashes.**
- By default, it also includes a [a service worker](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
  **so that your app loads from local cache on future visits.**

## Utilites and Assests

### Google Maps Api

The project makes use of the [Google maps api](https://developers.google.com/maps/documentation/javascript/tutorial) service to display the map of the chosen neighbourhood.

### Fouresquare Api

The data retrieved for each places are supplied by [FoursquareAPI](https://developer.foursquare.com/) a local search and recommender-system service. Attribution are credited on each infowindow displayed when the user clicks on a marker.

### Utils

- [Axios](https://github.com/axios/axios)
- [sort-by](https://www.npmjs.com/package/sort-by)
- [escape-string-regexp](https://www.npmjs.com/package/escape-string-regexp)
- [Fontawesome](https://fontawesome.com/)
- [Favicon](https://gauger.io/fonticon/)
- [prop-types](https://www.npmjs.com/package/prop-types)

## Resources

### 1. Integrating Google Maps in React using script tags and ref node

- [making-google-maps-work-with-react](https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/)
- [Google Async defer](https://www.youtube.com/watch?v=W5LhLZqj76s&list=PLgOB68PvvmWCGNn8UMTpcfQEiITzxEEA1&index=2)
- [handling-google-maps-in-async-and-fallback](https://discussions.udacity.com/t/handling-google-maps-in-async-and-fallback/34282/58)

### 2. Fallbacks and Error Handling

- [error handling in react](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html)
- [componentdidcatch-lifecycle-method](https://medium.com/@sgroff04/2-minutes-to-learn-react-16s-componentdidcatch-lifecycle-method-d1a69a1f753)

### 3. Asynchronous API Requests

- [api request with axios](https://www.youtube.com/watch?v=MEzcDiA6shM&t=1497s)
- [axios api request react](https://github.com/axios/axios)

### 4. Google Maps Api Resources

- [markers](https://developers.google.com/maps/documentation/javascript/markers)
- [infowindows](https://developers.google.com/maps/documentation/javascript/infowindows)

### 5. React Learning

- [Create React App](https://github.com/facebook/create-react-app)
- [Building with React](https://udacity.com/)
- [React thinking-in-react ](https://reactjs.org/docs/thinking-in-react.html)
- [React](https://codeburst.io/use-class-properties-to-clean-up-your-classes-and-react-components-93185879f688)
- [React faq-functions](https://reactjs.org/docs/faq-functions.html)
- [React reactive-state](https://reactjs.org/tutorial/tutorial.html#reactive-state)
- [CSS](https://j.eremy.net/confused-about-rem-and-em/)
- [react smooth sliding menu react motion](https://www.kirupa.com/react/smooth_sliding_menu_react_motion.htm)
- [conditional-rendering](https://reactjs.org/docs/conditional-rendering.html)
- [handling-events](https://reactjs.org/docs/handling-events.html)
- [callback-functions-in-react](https://medium.com/@thejasonfile/callback-functions-in-react-e822ebede766)

## Built with

This project was bootstraped with [create react app](https://github.com/facebook/create-react-app)

## Technologies

- Visual Studio Code Editor
- React.js
- Javascript
- HTML
- CSS

## Contributing

Any suggestions are welcome.
