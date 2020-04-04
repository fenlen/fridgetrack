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
        console.log(new Date(new Date(date).getTime()-(86400 * 1000)));
        console.log(new Date(date));
        if (days>1)
            PushNotification.localNotificationSchedule({//soon notification
              date: new Date(new Date(date).getTime()-(86400 * 1000)), // 1 day before the expiration date
              id: now.getTime()-2,
              bigText: name+" is expiring tomorrow, better use it up or it will go bad.",
              vibration: 300,
              title: "Fridge Notification",
              message: name+" is expiring tomorrow",
            });
        if (days>0)
        PushNotification.localNotificationSchedule({//soon notification
          date: new Date(date), // the day of expiration
          id: now.getTime()-1,
          bigText: name+" is expiring today, better use it up or it will go bad.",
          vibration: 300,
          title: "Fridge Notification",
          message: name+" is expiring today",
        });
    }
    if (Global.enableNotification2)
        console.log(new Date(new Date(date).getTime()+(86400 * 1000)));
        if(days>-1)
        PushNotification.localNotificationSchedule({//expiration notification
          date: new Date(new Date(date).getTime()+(86400 * 1000)), //the day after expiration
          id: now.getTime(),
          bigText: name+" has expired, let us know what happened to it.",
          vibration: 300,
          title: "Fridge Notification",
          message: name+" has expired",
        });
  }


  scheduleGroupNotif(id,dateString,name) {
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
    if(Global.enableNotification3) {
        if (days>1)
            PushNotification.localNotificationSchedule({//soon notification
              date: new Date(new Date(date).getTime()-(86400 * 1000)), // 1 day before the expiration date
              id: now.getTime()-2,
              bigText: name+" is expiring tomorrow, better use it up or it will go bad.",
              vibration: 300,
              title: "Group Fridge Notification",
              message: name+" is expiring tomorrow",
            });
        if (days>0)
        PushNotification.localNotificationSchedule({//soon notification
          date: new Date(date), // the day of expiration
          id: now.getTime()-1,
          bigText: name+" is expiring today, better use it up or it will go bad.",
          vibration: 300,
          title: "Group Fridge Notification",
          message: name+" is expiring today",
        });
    }
    if (Global.enableNotification4)
        if(days>-1)
        PushNotification.localNotificationSchedule({//expiration notification
          date: new Date(new Date(date).getTime()+(86400 * 1000)), //the day after expiration
          id: now.getTime(),
          bigText: name+" has expired, let us know what happened to it.",
          vibration: 300,
          title: "Group Fridge Notification", // (optional)
          message: name+" has expired", // (required)
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
    if (notif.title.equals("Fridge Notification"))

    Alert.alert(notif.title, notif.bigText);

  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }
}