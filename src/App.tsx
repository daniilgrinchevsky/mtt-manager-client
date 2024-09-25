import React from 'react';
import './assets/scss/themes.scss';
import RouteIndex from 'Routes/Index';

import {positions, Provider as AlertProvider, transitions} from 'react-alert'

import Alert from "./Common/Components/Alert";

// Activating fake backend

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

// init firebase backend
// initFirebaseBackend(firebaseConfig);

const options = {
  position: positions.TOP_RIGHT,
  timeout: 3000,
  offset: '10px',
  // you can also just use 'scale'
  transition: transitions.FADE
}

const getStyle = (type: string): string => {
  let typeToStyle = new Map<string, string>([
      ["success", "px-4 py-3 mt-2 me-2 text-sm text-green-500 border border-green-200 rounded-md bg-green-50 dark:bg-green-400/20"],
      ["error", "px-4 py-3 mt-2 me-2 text-sm text-red-500 border border-red-200 rounded-md bg-red-50 dark:bg-red-400/20 dark:border-red-500/50"],
      ["info", "px-4 py-3 mt-2 me-2 text-sm border rounded-md border-custom-200 text-custom-500 bg-custom-50 dark:bg-custom-400/20 dark:border-custom-500/50"]
  ]);

  // @ts-ignore
  return typeToStyle.get(type)

}

// @ts-ignore
const AlertTemplate = ({ style, options, message, close }) => (
    <Alert className={getStyle(options.type)}>
       {message}
    </Alert>
)

function App() {
  return (
      <AlertProvider template={AlertTemplate} {...options}>
      <RouteIndex />
      </AlertProvider>

  );
}

export default App;
