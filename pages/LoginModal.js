import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import Global from '../state/global';
import NotifService from '../services/NotifService';
import storageService from '../services/storage';
import {
  Container,
  Header,
  Left,
  Right,
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

const LoginModal = props => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  const notif = new NotifService();

  const login = async () => {
    try {
    await auth().signInWithEmailAndPassword(email, password);
    let user = auth().currentUser;
    let data = {};
    if (user) {
      await storageService.getUserData().then(dataList => (data = dataList));
      Global.user = user.uid;
      Global.enableNotiication1 = data['enableNotification1'];
      Global.enableNotiication2 = data['enableNotification2'];
      Global.enableNotiication3 = data['enableNotification3'];
      Global.enableNotiication4 = data['enableNotification4'];
      const items = await storageService.getAll();
            for (const i in items) {
              notif.scheduleNotif(parseInt(items[i].id),items[i].expDate,items[i].name);
            }
    }

    props.navigation.navigate("Theme");
    Alert.alert('You have logged in successfully');
    }
    catch(e) {
        let errorCode = e.code;
        let errorMessage = e.message;
        if (errorCode === 'auth/invalid-email') {
          Alert.alert('Error', 'Invalid Email');
        } else if (errorCode === 'auth/user-not-found') {
          Alert.alert('Error', 'User not found');
        } else if (errorCode === 'auth/wrong-password') {
          Alert.alert('Error', 'Wrong password');
        } else if (errorCode === 'auth/unknown') {
          Alert.alert('Error', 'Too many unsuccessful log in attempts, please try again later');
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
          <Title>Log in</Title>
        </Body>
      </Header>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input onChangeText={content => onChangeEmail(content)} />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input
              secureTextEntry
              onChangeText={content => onChangePassword(content)}
            />
          </Item>
        </Form>
        <Button
          rounded
          style={{margin: 15, marginTop: 50, justifyContent: 'center'}}
          onPress={() => login()}>
          <Text uppercase={false}>Log in</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default LoginModal;
