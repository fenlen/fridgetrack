import React, {Component} from "react";
import PushNotification from "react-native-push-notification";// tut from https://enappd.com/blog/firebase-push-notifications-in-react-native/81/
// var PushNotification = require("react-native-push-notification");

export default class PushController extends Component{
    componentDidMount(){
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function(token) {
              console.log("TOKEN:", token);
            },

            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
              console.log("NOTIFICATION:", notification);

              // process the notification here

            },
            senderID: "807992701414",
            popInitialNotification: true,
            requestPermissions: true
          });
    }

    render(){
        return null;
    }
}