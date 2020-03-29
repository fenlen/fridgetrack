import PushNotification from 'react-native-push-notification';
import Global from '../state/global';
import { Alert } from 'react-native';

export default class NotifService {

  constructor() {
    this.configure();
  }

  configure() {
    PushNotification.configure({

      // (required) Called when a remote or local notification is opened or received
      onNotification: this.onNotif.bind(this), //this._onNotification,
    });
  }

  scheduleNotif(id,dateString,name) {
    const now=new Date(id);
    const date = new Date(
            parseInt(dateString.substring(6, 8)) + 2000,
            parseInt(dateString.substring(3, 5)) - 1,
            parseInt(dateString.substring(0, 2)),
            now.getHours(),
            now.getMinutes(),
            now.getSeconds(),
          );
    const days = this.getDaysLeft(date);
    if(Global.enableNotification1) {
        if (days>1)
            PushNotification.localNotificationSchedule({//soon notification
              date: new Date(new Date(date)-(86400 * 1000)), // 2 days before the expiration date
              /* Android Only Properties */
              id: now.getTime()-2, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
              ticker: "My Notification Ticker", // (optional)
              bigText: name+" is expiring tomorrow, better use it up or it will go bad.", // (optional) default: "message" prop
              vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
              ongoing: false, // (optional) set whether this is an "ongoing" notification

              /* iOS and Android properties */
              title: "Fridge Notification", // (optional)
              message: name+" is expiring tomorrow", // (required)
              playSound: true, // (optional) default: true
              soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            });
        if (days>0)
        PushNotification.localNotificationSchedule({//soon notification
          date: new Date(date), // 1 day before the expiration date
          /* Android Only Properties */
          id: now.getTime()-1, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
          ticker: "My Notification Ticker", // (optional)
          bigText: name+" is expiring today, better use it up or it will go bad.", // (optional) default: "message" prop
          vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
          ongoing: false, // (optional) set whether this is an "ongoing" notification

          /* iOS and Android properties */
          title: "Fridge Notification", // (optional)
          message: name+" is expiring today", // (required)
          playSound: true, // (optional) default: true
          soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        });
    }
    if (Global.enableNotification2)
        if(days>-1)
        PushNotification.localNotificationSchedule({//expiration notification
          date: new Date(new Date(date).getTime()+(86400 *1000)), //the day of expiration
          /* Android Only Properties */
          id: now.getTime(), // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
          ticker: "My Notification Ticker", // (optional)
          bigText: name+" has expired, let us know what happened to it.", // (optional) default: "message" prop
          vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
          ongoing: false, // (optional) set whether this is an "ongoing" notification

          /* iOS and Android properties */
          title: "Fridge Notification", // (optional)
          message: name+" has expired", // (required)
          playSound: true, // (optional) default: true
          soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        });
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  cancelNotif(id) {
    const now=new Date(id).getTime();
    PushNotification.cancelLocalNotifications({id: id});
    PushNotification.cancelLocalNotifications({id: id-1});
    PushNotification.cancelLocalNotifications({id: id-2});
  }

  getDaysLeft(date) {
     const diff = date.getTime() - new Date().getTime();
     return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
  }

  onNotif(notif) {
    Alert.alert(notif.title, notif.message);
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }
}