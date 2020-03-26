/* eslint-disable react-native/no-inline-styles */
import React, {Component, Button} from 'react';
import {AppRegistry, StyleSheet, Text, View, Alert} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {RNCamera} from 'react-native-camera';

export default class Barcode extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{
            flex: 1,
            width: '100%',
          }}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
};
