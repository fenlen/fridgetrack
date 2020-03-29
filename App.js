/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import AppDrw from './pages/App.js';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render()

  {
    return (<>
            <AppDrw />
            </>);
  }
}