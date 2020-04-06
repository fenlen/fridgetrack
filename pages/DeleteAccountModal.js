/** The modal to let a user delete their account. Cleans the database of all entries related to the user */
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import Global from '../state/global';
import firestore, {firebase} from '@react-native-firebase/firestore';
import NotifService from '../services/NotifService';
import storage from '../services/storage';
import {
  Container,
  Header,
  Left,
  Button,
  Body,
  Content,
  Icon,
  Title,
  Text,
  Form,
  Item,
  Label,
  Input,
} from 'native-base';

const DeleteAccountModal = props => {
  const [password, onChangePassword] = useState('');
  const user = auth().currentUser;
  const notif = new NotifService();

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
    if (code) {
      await firebase
        .firestore()
        .collection('fridges')
        .doc(code)
        .update({
          members: firebase.firestore.FieldValue.arrayRemove(user.email),
        });
    }
  };

  const deleteAccount = async () => {
    await Promise.all([
      leaveGroup(),
      firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .delete(),
      storage.deleteAll(),
      storage.deleteAllShop(),
      storage.deleteAllMeal(),
      storage.deleteAllRecipe(),
    ]);
    notif.cancelAll();
  };

  const initDelete = async () => {
    try {
      let user = auth().currentUser;
      if (!password) {
        Alert.alert('Error', 'New Password cannot be empty');
      } else {
        deleteAccount();
        await auth().signInWithEmailAndPassword(user.email, password);
        await auth().currentUser.delete();
        props.navigation.navigate('App');
        Alert.alert('You have deleted you account successfully');
        Global.user = user.uid;
      }
    } catch (e) {
      let errorCode = e.code;
      let errorMessage = e.message;
      if (errorCode === 'auth/wrong-password') {
        Alert.alert('Error', 'Wrong password');
      } else {
        Alert.alert('Error', errorMessage);
      }
    }
  };
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Delete Account</Title>
        </Body>
      </Header>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Your Password</Label>
            <Input
              secureTextEntry
              onChangeText={content => onChangePassword(content)}
            />
          </Item>
        </Form>
        <Button
          rounded
          style={{margin: 15, marginTop: 50, justifyContent: 'center'}}
          onPress={() => initDelete()}>
          <Text uppercase={false}>Delete</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default DeleteAccountModal;
