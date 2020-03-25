/**
 * @format
 * @flow
 */

import React from 'react';
import AppDrw from './pages/App.js';
import PushController from './services/PushController';

export default class App extends React.Component {


  render() {
    return (<>
            <AppDrw />
            <PushController/>
            </>);
  }
}