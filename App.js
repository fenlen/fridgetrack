/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import AppDrw from './pages/App.js';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import NotifService from './services/NotifService';
import appConfig from './app.json';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.notif = new NotifService(this.onNotif.bind(this));
  }

  render() /*{
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Example app react-native-push-notification</Text>
        <View style={styles.spacer}></View>
        <TextInput style={styles.textField} value={this.state.registerToken} placeholder="Register token" />
        <View style={styles.spacer}></View>

        <TouchableOpacity style={styles.button} onPress={() => { this.notif.localNotif() }}><Text>Local Notification (now)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { this.notif.scheduleNotif() }}><Text>Schedule Notification in 30s</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { this.notif.cancelNotif() }}><Text>Cancel last notification (if any)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { this.notif.cancelAll() }}><Text>Cancel all notifications</Text></TouchableOpacity>
        <View style={styles.spacer}></View>
      </View>
    );
  }*/

  {
    return (<>
            <AppDrw />
            </>);
  }
  onNotif(notif) {
    Alert.alert(notif.title, notif.message);
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "#000000",
    margin: 5,
    padding: 5,
    width: "70%",
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
  },
  textField: {
    borderWidth: 1,
    borderColor: "#AAAAAA",
    margin: 5,
    padding: 5,
    width: "70%"
  },
  spacer: {
    height: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  }
});