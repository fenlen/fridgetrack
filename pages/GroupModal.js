/** Modal for creating/joining a group. */
import React, {useState} from 'react';
import {Alert, Clipboard} from 'react-native';
import Style from '../components/Style';
import prompt from 'react-native-prompt-android';
import firebase from '@react-native-firebase/app';
import storageService from '../services/storage';
import Global from '../state/global.js';

import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  ListItem,
  Separator,
} from 'native-base';

const GroupModal = props => {
  const user = firebase.auth().currentUser;
  const [groupFridge, setFridge] = useState(Global.groupFridge);
  const [ready, setReady] = useState(true);

  const createGroup = async () => {
    if (groupFridge !== '') {
      await leaveGroup();
    }
    let docId;
    await firebase
      .firestore()
      .collection('fridges')
      .add({
        creator: user.email,
        members: [user.email],
        date: Date.now(),
      })
      .then(docRef => (docId = docRef.id));
    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .update({groupFridge: docId});
    await storageService
      .getFridgeData(docId)
      .then(fridge => (Global.groupFridge = fridge));
    setFridge(Global.groupFridge);
  };

  const joinGroup = async docId => {
    try {
      await firebase
        .firestore()
        .collection('fridges')
        .doc(docId)
        .update({
          members: firebase.firestore.FieldValue.arrayUnion(user.email),
        });
    } catch (e) {
      Alert.alert('The fridge was not found');
      throw e;
    }
    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .update({groupFridge: docId});
    await storageService
      .getFridgeData(docId)
      .then(fridge => (Global.groupFridge = fridge));
    setFridge(Global.groupFridge);
  };

  const leaveGroup = async () => {
    let code;
    const getCode = async () => {
      await firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(snapshot => (code = snapshot.get('groupFridge')));
    };
    await getCode();
    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .update({groupFridge: ''});
    await firebase
      .firestore()
      .collection('fridges')
      .doc(code)
      .update({members: firebase.firestore.FieldValue.arrayRemove(user.email)});
    Global.groupFridge = '';
    setFridge(Global.groupFridge);
  };
  const JoinPrompt = () => {
    prompt(
      'Join a group',
      'Please enter the group identification code (you can get this from any member of the group).',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Confirm', onPress: password => joinGroup(password)},
      ],
      {
        type: 'default',
        cancelable: false,
        defaultValue: null,
      },
    );
  };

  const CreateAlert = () => {
    Alert.alert(
      'Create a group',
      'Are you sure you want to create a new group? Doing so will automatically remove you from your current group and add you to the newly created one.',
      [
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => createGroup()},
      ],
      {cancelable: false},
    );
  };

  const LeaveAlert = () => {
    Alert.alert(
      'Leave a group',
      'Are you sure you want to leave the group? Once you leave you can rejoin at any time.',
      [
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => leaveGroup()},
      ],
      {cancelable: false},
    );
  };

  const CodeAlert = async () => {
    let code;
    const getCode = async () => {
      await firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(snapshot => (code = snapshot.get('groupFridge')));
    };
    await getCode();
    Clipboard.setString(code);
    Alert.alert(
      'Get access code',
      'The code for accessing the group is ' +
        code +
        ' . It has also been copied to the clipboard. ',
    );
  };

  const formattedDate = dateString => {
    var date = new Date(parseInt(dateString));
    return (
      ('0' + date.getDate()).slice(-2) +
      '/' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '/' +
      (date.getFullYear() - 2000)
    );
  };

  return (
    <Container style={Style.container}>
      <Header searchBar>
        <Left style={{flex: 0, width: 50}}>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Your Group</Title>
        </Body>
      </Header>
      {!ready && <Content />}
      {ready && (
        <Content>
          {groupFridge !== '' && (
            <>
              <Separator bordered>
                <Text>Group Details</Text>
              </Separator>
              <ListItem>
                <Left>
                  <Text>Group Creator</Text>
                </Left>
                <Body>
                  <Text>{groupFridge.creator}</Text>
                </Body>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Number of members</Text>
                </Left>
                <Right>
                  <Text>{groupFridge.members.length}</Text>
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Date created</Text>
                </Left>
                <Body>
                  <Text>{formattedDate(groupFridge.date)}</Text>
                </Body>
              </ListItem>
            </>
          )}
          <Button
            primary
            rounded
            style={{margin: 20, justifyContent: 'center'}}
            onPress={() => JoinPrompt()}>
            <Text uppercase={false}>Join a group</Text>
          </Button>
          <Button
            primary
            rounded
            style={{margin: 20, justifyContent: 'center'}}
            onPress={() => CreateAlert()}>
            <Text uppercase={false}>Create a new group</Text>
          </Button>
          {groupFridge !== '' && (
            <>
              <Button
                primary
                rounded
                style={{margin: 20, justifyContent: 'center'}}
                onPress={() => LeaveAlert()}>
                <Text uppercase={false}>Leave group</Text>
              </Button>
              <Button
                primary
                rounded
                style={{margin: 20, justifyContent: 'center'}}
                onPress={() => CodeAlert()}>
                <Text uppercase={false}>Get access code</Text>
              </Button>
            </>
          )}
        </Content>
      )}
    </Container>
  );
};

export default GroupModal;
