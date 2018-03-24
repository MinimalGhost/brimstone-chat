# VROOMvote

A platform for connecting people looking to volunteer as carpool drivers during the 2018 midterm elections with those who can't ordinarily make it to voting stations due to lack of transportation, disability, etc. Matches users by congressional district as either drivers or riders. Uses Google Civic Information, Maps and Geocoding API's. Demo video can be found [here](https://youtu.be/s7pBIScO4w4).

## Intalling / Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It also uses [npm](https://www.npmjs.com/) and a [react](https://reactjs.org/) based frontend. Credit to [react-moment](https://www.npmjs.com/package/react-moment) for timestamp support. The backend uses [Firebase](https://firebase.google.com/) for rapid prototyping and real time chat updates.

### Server setup

Fork and/or clone the repository, then reach out to me directly for a copy of the missing `firebase.js` file needed to interact with the server.

### Frontend setup

Once you receive the firebase file, drop it into the `src` directory then make sure to `cd` to the top level of the repository and run:
```
npm install && npm start
```
to get dependencies installed locally and have it running on your local host. Because it is a Create-React app this will automatically open a browser window pointing to the frontend and you will be able to interact from there.

## License

[MIT](https://oss.ninja/mit?organization=Eric%20Kollegger) Copyright 2018 [Eric Kollegger](https://github.com/MinimalGhost)
