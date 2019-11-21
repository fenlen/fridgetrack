import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Alert } from 'react-native';
import BarcodeScanner from 'react-native-barcode-scanner-google';
import {createStackNavigator} from 'react-navigation-stack';

const data = "5010251538462";
const type = "Type1";

export default class Barcode extends Component {
render() {
    const {navigate} = this.props.navigation;
    return (<>
      <View style={{flex: 1}}>
          <BarcodeScanner
              style={{flex: 1}}
              onBarcodeRead={({data, type}) => {
                  // handle your scanned barcodes here!
                  // as an example, we show an alert:
                  //Alert.alert(`Barcode '${data}' of type '${type}' was scanned.`);
                  navigate('MyModal' ,{"barcode": data});

              }}
          />
      </View>
      </>
    );
    }
}

AppRegistry.registerComponent('BarcodeApp', () => BarcodeApp);