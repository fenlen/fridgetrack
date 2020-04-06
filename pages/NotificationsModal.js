import React, {useState, Component} from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Right,
  Body,
  Left,
  ListItem,
  Switch,
} from 'native-base';
import Global from '../state/global.js';
import firestore, {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import NotifService from '../services/NotifService';
import storageService from '../services/storage';

class NotificationsModal extends Component {
  constructor(props) {
    super(props);

    this.notif = new NotifService();
  }

  async updateNotifications() {
    const items = await storageService.getAll();
    const groupItems = await storageService.getAll('', true);
    this.notif.cancelAll();
    items.map(item =>
      this.notif.scheduleNotif(parseInt(item.id), item.expDate, item.name),
    );
    groupItems.map(item =>
      this.notif.scheduleGroupNotif(parseInt(item.id), item.expDate, item.name),
    );
  }

  onValueChange1(value) {
    //immediately applies the option change to the db as the user selects it
    Global.enableNotification1 = value;
    this.updateNotifications();
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .update({enableNotification1: value});
    this.forceUpdate();
  }
  onValueChange2(value) {
    Global.enableNotification2 = value;
    this.updateNotifications();
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .update({enableNotification2: value});
    this.forceUpdate();
  }
  onValueChange3(value) {
    Global.enableNotification3 = value;
    this.updateNotifications();
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .update({enableNotification3: value});
    this.forceUpdate();
  }
  onValueChange4(value) {
    Global.enableNotification4 = value;
    this.updateNotifications();
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .update({enableNotification4: value});
    this.forceUpdate();
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Notifications</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <ListItem>
            <Body>
              <Text>Notify items about to expire from my fridge</Text>
            </Body>
            <Right>
              <Switch
                value={Global.enableNotification1}
                trackColor="#50B948"
                onValueChange={this.onValueChange1.bind(this)}
              />
            </Right>
          </ListItem>
          <ListItem>
            <Body>
              <Text>Notify expired from my fridge</Text>
            </Body>
            <Right>
              <Switch
                value={Global.enableNotification2}
                trackColor="#50B948"
                onValueChange={this.onValueChange2.bind(this)}
              />
            </Right>
          </ListItem>
          <ListItem>
            <Body>
              <Text>Notify items about to expire from group fridge</Text>
            </Body>
            <Right>
              <Switch
                value={Global.enableNotification3}
                trackColor="#50B948"
                onValueChange={this.onValueChange3.bind(this)}
              />
            </Right>
          </ListItem>
          <ListItem>
            <Body>
              <Text>Notify expired items from group fridge</Text>
            </Body>
            <Right>
              <Switch
                value={Global.enableNotification4}
                trackColor="#50B948"
                onValueChange={this.onValueChange4.bind(this)}
              />
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

export default NotificationsModal;
