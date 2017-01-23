# PicMe

An app for users to create events and upload photos to those events to be compared to one another. Other users can then join their event to see the entries and vote on their favourite. When time's up, the results are calculated and a winner is revealed!

Created at ConUHacks 2017

## How it was built

Using React Native for the front end, to target both Android and iOS. Additionally, it allowed one of our team members to explore a technology he was unfamiliar with and learn many new things.

The back end was built with Node and Express, another technology new to one of our team members, but not the other. They worked together to build all the endpoints required for the front end to function, and hooked them into our mongodb server.

## Screenshots

|    Welcome    |     Events      |
|:-------------:|:---------------:|
| <img src='./screenshots/welcome.jpg' width='220' alt='Welcome' /> | <img src='./screenshots/events.jpg' width='220' alt='Events'/> |

| Event Details |   Votes    |
|:-------------:|:----------:|
| <img src='./screenshots/event_details.jpg' width='220' alt='Event details' /> | <img src='./screenshots/voting.jpg' width='220' alt='Votes'/> |

## Build Instructions

### Prerequisites

You must have [Node.js](https://docs.npmjs.com/getting-started/installing-node) installed, as well as the [react-native-cli](https://facebook.github.io/react-native/docs/getting-started.html) tools

If you want to test Android, you must have the [Android SDK](https://developer.android.com/studio/index.html) installed

If you want to test iOS, you must have a OS X and Xcode installed

### Server

1. Navigate to server directory: `cd server`
2. Start a MongoDB instance and update `server.js` with the connection URL on line 8
3. Install dependencies for server: `npm install`
4. Start the server with `npm start`

### Mobile app

1. Navigate to react-native directory: `cd react-native`
2. Install dependencies for app: `npm install`
3. Build and run the React Native app: `react-native run-ios` or `react-native run-android`
